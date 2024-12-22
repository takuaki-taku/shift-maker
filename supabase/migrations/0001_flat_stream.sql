/*
  # Initial Schema Setup for Shift Management System

  1. New Tables
    - `instructors` - 指導者情報
      - `id` (uuid, primary key)
      - `email` (text, unique) - 認証用メールアドレス
      - `name` (text) - 指導者名
      - `club` (text) - 担当部活
      - `created_at` (timestamptz)
      
    - `shift_preferences` - シフト希望
      - `id` (uuid, primary key)
      - `instructor_id` (uuid, foreign key)
      - `date` (date) - 希望日
      - `start_time` (time) - 開始時間（15分単位）
      - `end_time` (time) - 終了時間（15分単位）
      - `preference_level` (text) - 希望度（available, preferred, unavailable）
      - `created_at` (timestamptz)
      
    - `shifts` - 確定シフト
      - `id` (uuid, primary key)
      - `instructor_id` (uuid, foreign key)
      - `date` (date)
      - `start_time` (time)
      - `end_time` (time)
      - `status` (text) - シフトステータス（confirmed, tentative）
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Instructors table
CREATE TABLE instructors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  club text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Instructors can read own data"
  ON instructors
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Instructors can update own data"
  ON instructors
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Shift preferences table
CREATE TABLE shift_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id uuid REFERENCES instructors(id) NOT NULL,
  date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  preference_level text NOT NULL CHECK (preference_level IN ('available', 'preferred', 'unavailable')),
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_time_range CHECK (start_time < end_time),
  CONSTRAINT valid_time_intervals CHECK (
    EXTRACT(MINUTE FROM start_time)::integer % 15 = 0 AND
    EXTRACT(MINUTE FROM end_time)::integer % 15 = 0
  )
);

ALTER TABLE shift_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Instructors can manage own preferences"
  ON shift_preferences
  FOR ALL
  TO authenticated
  USING (instructor_id = auth.uid());

-- Shifts table
CREATE TABLE shifts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  instructor_id uuid REFERENCES instructors(id) NOT NULL,
  date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  status text NOT NULL CHECK (status IN ('confirmed', 'tentative')),
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_time_range CHECK (start_time < end_time),
  CONSTRAINT valid_time_intervals CHECK (
    EXTRACT(MINUTE FROM start_time)::integer % 15 = 0 AND
    EXTRACT(MINUTE FROM end_time)::integer % 15 = 0
  )
);

ALTER TABLE shifts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Instructors can read own shifts"
  ON shifts
  FOR SELECT
  TO authenticated
  USING (instructor_id = auth.uid());

CREATE POLICY "Instructors can read all shifts"
  ON shifts
  FOR SELECT
  TO authenticated
  USING (true);