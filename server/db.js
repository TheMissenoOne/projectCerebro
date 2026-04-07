const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://wlpdfrqzbpwuxyqeayjt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndscGRmcnF6YnB3dXh5cWVheWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MDQwODYsImV4cCI6MjA5MTA4MDA4Nn0.RkLXucAPwp0Edba7nG8pZOXrsOzjjrEbOIFwg-uyRLM';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
