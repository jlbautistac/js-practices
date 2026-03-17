-- Create priority type
CREATE TYPE priority_level AS ENUM ('Low', 'Medium', 'High');

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    priority priority_level NOT NULL,
    iscompleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tasks_updated_at
BEFORE UPDATE ON tasks
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Insert some sample data (optional)
INSERT INTO tasks (title, priority, iscompleted) VALUES
('Complete project documentation', 'High', false),
('Review pull requests', 'Medium', false),
('Update dependencies', 'Low', true);
