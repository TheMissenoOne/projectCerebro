/**
 * X-MEN TTRPG - Server Configuration
 * Centralized environment and configuration management
 */

module.exports = {
  // Supabase Configuration
  supabaseUrl: process.env.SUPABASE_URL || 'https://wlpdfrqzbpwuxyqeayjt.supabase.co',
  supabaseKey: process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndscGRmcnF6YnB3dXh5cWVheWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MDQwODYsImV4cCI6MjA5MTA4MDA4Nn0.RkLXucAPwp0Edba7nG8pZOXrsOzjjrEbOIFwg-uyRLM',

  // JWT Configuration
  jwtSecret: process.env.JWT_SECRET || 'xmen-dev-secret',

  // Server Configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // CORS Configuration
  corsOrigin: process.env.CORS_ORIGIN || '*',

  // API Configuration
  apiPrefix: '/api',
};
