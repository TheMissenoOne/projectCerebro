-- Add missing foto_base64 column to characters table
ALTER TABLE characters ADD COLUMN IF NOT EXISTS foto_base64 TEXT;