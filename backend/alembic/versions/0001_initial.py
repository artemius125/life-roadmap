"""initial schema

Revision ID: 0001
Revises:
Create Date: 2026-04-13
"""
from alembic import op

revision = "0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ── events ────────────────────────────────────────────────────────────────
    op.execute("""
        CREATE TABLE events (
            id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            parent_id   UUID REFERENCES events(id) ON DELETE SET NULL,
            type        VARCHAR(32) NOT NULL,
            icon        VARCHAR(16),
            title       VARCHAR(255) NOT NULL,
            date_text   VARCHAR(64),
            date_from   DATE,
            date_to     DATE,
            body        TEXT,
            impact      SMALLINT DEFAULT 0 CHECK (impact BETWEEN -5 AND 5),
            tags        TEXT[] DEFAULT '{}',
            metrics     JSONB DEFAULT '{}',
            pos         INTEGER DEFAULT 0,
            created_at  TIMESTAMPTZ DEFAULT NOW(),
            updated_at  TIMESTAMPTZ DEFAULT NOW()
        )
    """)

    # ── audit_log ─────────────────────────────────────────────────────────────
    op.execute("""
        CREATE TABLE audit_log (
            id          BIGSERIAL PRIMARY KEY,
            event_id    UUID NOT NULL,
            operation   VARCHAR(8) NOT NULL,
            old_data    JSONB,
            new_data    JSONB,
            changed_at  TIMESTAMPTZ DEFAULT NOW()
        )
    """)

    # ── snapshots ─────────────────────────────────────────────────────────────
    op.execute("""
        CREATE TABLE snapshots (
            id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            period_start    DATE NOT NULL,
            period_end      DATE NOT NULL,
            metrics_json    JSONB NOT NULL,
            created_at      TIMESTAMPTZ DEFAULT NOW()
        )
    """)

    # ── Индексы ───────────────────────────────────────────────────────────────
    op.execute("CREATE INDEX idx_events_type      ON events(type)")
    op.execute("CREATE INDEX idx_events_date_from ON events(date_from)")
    op.execute("CREATE INDEX idx_events_parent_id ON events(parent_id)")
    op.execute("CREATE INDEX idx_events_impact    ON events(impact)")
    op.execute("CREATE INDEX idx_events_metrics   ON events USING GIN(metrics)")
    op.execute("CREATE INDEX idx_events_tags      ON events USING GIN(tags)")
    op.execute("CREATE INDEX idx_audit_event_id   ON audit_log(event_id)")
    op.execute("CREATE INDEX idx_audit_changed_at ON audit_log(changed_at DESC)")
    op.execute("CREATE INDEX idx_snapshots_start  ON snapshots(period_start DESC)")

    # ── Trigger: updated_at ───────────────────────────────────────────────────
    op.execute("""
        CREATE OR REPLACE FUNCTION set_updated_at()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    """)
    op.execute("""
        CREATE TRIGGER events_updated_at
        BEFORE UPDATE ON events
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    """)

    # ── Trigger: audit_log ────────────────────────────────────────────────────
    op.execute("""
        CREATE OR REPLACE FUNCTION audit_events()
        RETURNS TRIGGER AS $$
        BEGIN
            IF TG_OP = 'DELETE' THEN
                INSERT INTO audit_log (event_id, operation, old_data)
                VALUES (OLD.id, 'DELETE', to_jsonb(OLD));
                RETURN OLD;
            ELSIF TG_OP = 'UPDATE' THEN
                INSERT INTO audit_log (event_id, operation, old_data, new_data)
                VALUES (NEW.id, 'UPDATE', to_jsonb(OLD), to_jsonb(NEW));
                RETURN NEW;
            ELSIF TG_OP = 'INSERT' THEN
                INSERT INTO audit_log (event_id, operation, new_data)
                VALUES (NEW.id, 'INSERT', to_jsonb(NEW));
                RETURN NEW;
            END IF;
        END;
        $$ LANGUAGE plpgsql;
    """)
    op.execute("""
        CREATE TRIGGER events_audit
        AFTER INSERT OR UPDATE OR DELETE ON events
        FOR EACH ROW EXECUTE FUNCTION audit_events();
    """)

    # ── Recursive CTE: get_event_chain ────────────────────────────────────────
    op.execute("""
        CREATE OR REPLACE FUNCTION get_event_chain(root_id UUID)
        RETURNS TABLE(id UUID, parent_id UUID, title VARCHAR, type VARCHAR, depth INTEGER) AS $$
            WITH RECURSIVE chain AS (
                SELECT e.id, e.parent_id, e.title, e.type, 0 AS depth
                FROM events e
                WHERE e.id = root_id
                UNION ALL
                SELECT e.id, e.parent_id, e.title, e.type, c.depth + 1
                FROM events e
                JOIN chain c ON e.parent_id = c.id
            )
            SELECT * FROM chain;
        $$ LANGUAGE sql;
    """)

    # ── Materialized Views ────────────────────────────────────────────────────
    op.execute("""
        CREATE MATERIALIZED VIEW mv_maslow_current AS
        SELECT
            (metrics->>'maslow_level')::int   AS level,
            COUNT(*)                           AS events_count,
            AVG((metrics->>'maslow_score')::float) AS avg_score
        FROM events
        WHERE metrics ? 'maslow_level'
        GROUP BY level
        ORDER BY level;
    """)
    op.execute("CREATE UNIQUE INDEX ON mv_maslow_current(level)")

    op.execute("""
        CREATE MATERIALIZED VIEW mv_wheel_of_life AS
        SELECT
            domain_key,
            AVG(domain_value::float) AS avg_score
        FROM events,
             jsonb_each_text(metrics->'life_domains') AS d(domain_key, domain_value)
        WHERE metrics ? 'life_domains'
        GROUP BY domain_key;
    """)
    op.execute("CREATE UNIQUE INDEX ON mv_wheel_of_life(domain_key)")

    op.execute("""
        CREATE MATERIALIZED VIEW mv_density AS
        SELECT
            EXTRACT(YEAR FROM date_from)::int AS year,
            COUNT(*)                           AS events_count
        FROM events
        WHERE date_from IS NOT NULL
        GROUP BY year
        ORDER BY year;
    """)
    op.execute("CREATE UNIQUE INDEX ON mv_density(year)")

    # ── Trigger для обновления Materialized Views ─────────────────────────────
    op.execute("""
        CREATE OR REPLACE FUNCTION refresh_materialized_views()
        RETURNS TRIGGER AS $$
        BEGIN
            REFRESH MATERIALIZED VIEW CONCURRENTLY mv_maslow_current;
            REFRESH MATERIALIZED VIEW CONCURRENTLY mv_wheel_of_life;
            REFRESH MATERIALIZED VIEW CONCURRENTLY mv_density;
            RETURN NULL;
        END;
        $$ LANGUAGE plpgsql;
    """)
    op.execute("""
        CREATE TRIGGER refresh_mv_on_events
        AFTER INSERT OR UPDATE OR DELETE ON events
        FOR EACH STATEMENT EXECUTE FUNCTION refresh_materialized_views();
    """)


def downgrade() -> None:
    op.execute("DROP TRIGGER IF EXISTS refresh_mv_on_events ON events")
    op.execute("DROP FUNCTION IF EXISTS refresh_materialized_views()")
    op.execute("DROP MATERIALIZED VIEW IF EXISTS mv_density")
    op.execute("DROP MATERIALIZED VIEW IF EXISTS mv_wheel_of_life")
    op.execute("DROP MATERIALIZED VIEW IF EXISTS mv_maslow_current")
    op.execute("DROP FUNCTION IF EXISTS get_event_chain(UUID)")
    op.execute("DROP TRIGGER IF EXISTS events_audit ON events")
    op.execute("DROP FUNCTION IF EXISTS audit_events()")
    op.execute("DROP TRIGGER IF EXISTS events_updated_at ON events")
    op.execute("DROP FUNCTION IF EXISTS set_updated_at()")
    op.execute("DROP TABLE IF EXISTS snapshots")
    op.execute("DROP TABLE IF EXISTS audit_log")
    op.execute("DROP TABLE IF EXISTS events")
