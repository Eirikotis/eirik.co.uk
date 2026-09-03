CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY,
  anonymous_session_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS conversations_session_updated_idx
  ON conversations (anonymous_session_id, updated_at DESC);

CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY,
  conversation_id uuid NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  model text,
  provider text,
  status text NOT NULL DEFAULT 'complete' CHECK (status IN ('complete', 'error')),
  error_code text,
  input_tokens integer,
  output_tokens integer,
  total_tokens integer,
  cost_credits numeric(18, 10),
  cached_tokens integer,
  cache_write_tokens integer,
  upstream_inference_cost numeric(18, 10),
  generation_id text,
  evidence_keys text[],
  context_characters integer,
  history_messages integer,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE messages ADD COLUMN IF NOT EXISTS provider text;
ALTER TABLE messages ADD COLUMN IF NOT EXISTS input_tokens integer;
ALTER TABLE messages ADD COLUMN IF NOT EXISTS output_tokens integer;
ALTER TABLE messages ADD COLUMN IF NOT EXISTS total_tokens integer;
ALTER TABLE messages ADD COLUMN IF NOT EXISTS cost_credits numeric(18, 10);
ALTER TABLE messages ADD COLUMN IF NOT EXISTS cached_tokens integer;
ALTER TABLE messages ADD COLUMN IF NOT EXISTS cache_write_tokens integer;
ALTER TABLE messages ADD COLUMN IF NOT EXISTS upstream_inference_cost numeric(18, 10);
ALTER TABLE messages ADD COLUMN IF NOT EXISTS generation_id text;
ALTER TABLE messages ADD COLUMN IF NOT EXISTS evidence_keys text[];
ALTER TABLE messages ADD COLUMN IF NOT EXISTS context_characters integer;
ALTER TABLE messages ADD COLUMN IF NOT EXISTS history_messages integer;

CREATE INDEX IF NOT EXISTS messages_conversation_created_idx
  ON messages (conversation_id, created_at ASC);

CREATE TABLE IF NOT EXISTS rate_limits (
  bucket_key char(64) NOT NULL,
  window_start timestamptz NOT NULL,
  request_count integer NOT NULL DEFAULT 1,
  PRIMARY KEY (bucket_key, window_start)
);

CREATE INDEX IF NOT EXISTS rate_limits_window_idx ON rate_limits (window_start);
