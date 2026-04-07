const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT || 3000;

console.log('Starting server...');

// Supabase connection
const supabaseUrl = 'https://wlpdfrqzbpwuxyqeayjt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndscGRmcnF6YnB3dXh5cWVheWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MDQwODYsImV4cCI6MjA5MTA4MDA4Nn0.RkLXucAPwp0Edba7nG8pZOXrsOzjjrEbOIFwg-uyRLM';

let supabase;
try {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('Supabase client created');
} catch (e) {
  console.error('Failed to create Supabase client:', e);
}

// Auth routes
app.post('/auth/register', async (req, res) => {
  console.log('Register:', req.body);
  try {
    const { email, password, username, displayName, role } = req.body;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, display_name: displayName, role: role || 'player' }
      }
    });
    
    if (error) {
      console.error('Register error:', error);
      throw new Error(error.message);
    }
    
    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: data.user.id,
        email,
        username,
        display_name: displayName,
        role: role || 'player'
      });
      if (profileError) console.error('Profile upsert error:', profileError);
    }
    
    console.log('Register success:', data);
    res.json({ user: data.user, session: data.session });
  } catch (e) {
    console.error('Register exception:', e);
    res.status(400).json({ error: e.message });
  }
});

app.post('/auth/login', async (req, res) => {
  console.log('Login:', req.body.email);
  try {
    const { email, password } = req.body;
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      console.error('Login error:', error);
      throw new Error(error.message);
    }
    
    console.log('Login success:', data.user?.email);
    res.json({ user: data.user, session: data.session });
  } catch (e) {
    console.error('Login exception:', e);
    res.status(401).json({ error: e.message });
  }
});

// Profile routes
app.get('/profiles/:id', async (req, res) => {
  try {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', req.params.id).single();
    if (error) throw new Error(error.message);
    res.json(data);
  } catch (e) {
    res.status(404).json({ error: 'Not found' });
  }
});

// Party routes
app.post('/parties', async (req, res) => {
  try {
    const { name, gm_id } = req.body;
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const { data, error } = await supabase.from('parties').insert({ name, gm_id, code }).select().single();
    if (error) throw new Error(error.message);
    
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/parties/gm/:gmId', async (req, res) => {
  try {
    const { data, error } = await supabase.from('parties').select('*').eq('gm_id', req.params.gmId).single();
    if (error) return res.json(null);
    res.json(data);
  } catch (e) {
    res.json(null);
  }
});

app.get('/parties/code/:code', async (req, res) => {
  try {
    const { data, error } = await supabase.from('parties').select('*').eq('code', req.params.code.toUpperCase()).single();
    if (error) return res.status(404).json({ error: 'Código inválido' });
    res.json(data);
  } catch (e) {
    res.status(404).json({ error: 'Código inválido' });
  }
});

app.post('/parties/:partyId/members', async (req, res) => {
  try {
    const { player_id } = req.body;
    const { error } = await supabase.from('party_members').insert({ party_id: req.params.partyId, player_id });
    if (error) throw new Error(error.message);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/parties/:partyId/members', async (req, res) => {
  try {
    const { data, error } = await supabase.from('party_members').select('*, profiles(*)').eq('party_id', req.params.partyId);
    if (error) throw new Error(error.message);
    res.json(data || []);
  } catch (e) {
    res.json([]);
  }
});

app.get('/players/:playerId/party', async (req, res) => {
  try {
    const { data, error } = await supabase.from('party_members').select('*, parties(*)').eq('player_id', req.params.playerId).single();
    if (error) return res.json(null);
    res.json(data?.parties || null);
  } catch (e) {
    res.json(null);
  }
});

// Character routes
app.post('/characters', async (req, res) => {
  try {
    const { player_id, party_id } = req.body;
    const id = uuidv4();
    
    const { data, error } = await supabase.from('characters').insert({
      id, player_id, party_id, name: 'Novo Personagem', data: {}
    }).select().single();
    
    if (error) throw new Error(error.message);
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/characters/:id', async (req, res) => {
  try {
    const { data, error } = await supabase.from('characters').select('*').eq('id', req.params.id).single();
    if (error) return res.status(404).json({ error: 'Not found' });
    res.json(data);
  } catch (e) {
    res.status(404).json({ error: 'Not found' });
  }
});

app.get('/characters/:id/public', async (req, res) => {
  try {
    const { data, error } = await supabase.from('characters').select('id, name, codename, data').eq('id', req.params.id).single();
    if (error) return res.status(404).json({ error: 'Not found' });
    res.json(data);
  } catch (e) {
    res.status(404).json({ error: 'Not found' });
  }
});

app.put('/characters/:id', async (req, res) => {
  try {
    const { data: char } = await supabase.from('characters').select('player_id').eq('id', req.params.id).single();
    if (!char) return res.status(404).json({ error: 'Not found' });
    
    const { data, error } = await supabase.from('characters').upsert({
      id: req.params.id,
      ...req.body,
      updated_at: new Date().toISOString()
    }).select().single();
    
    if (error) throw new Error(error.message);
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete('/characters/:id', async (req, res) => {
  try {
    const { error } = await supabase.from('characters').delete().eq('id', req.params.id);
    if (error) throw new Error(error.message);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/players/:playerId/characters', async (req, res) => {
  try {
    const { data, error } = await supabase.from('characters').select('*').eq('player_id', req.params.playerId).order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    res.json(data || []);
  } catch (e) {
    res.json([]);
  }
});

app.get('/parties/:partyId/characters', async (req, res) => {
  try {
    const { data, error } = await supabase.from('characters').select('*').eq('party_id', req.params.partyId).order('name');
    if (error) throw new Error(error.message);
    res.json(data || []);
  } catch (e) {
    res.json([]);
  }
});

// NPC routes
app.get('/npcs', async (req, res) => {
  try {
    const { partyId, includeGlobal } = req.query;
    let query = supabase.from('npcs').select('*').order('name');
    
    if (partyId && includeGlobal === 'true') {
      query = query.or(`party_id.eq.${partyId},is_global.eq.true`);
    } else if (partyId) {
      query = query.eq('party_id', partyId);
    } else {
      query = query.eq('is_global', true);
    }
    
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    res.json(data || []);
  } catch (e) {
    res.json([]);
  }
});

app.post('/npcs', async (req, res) => {
  try {
    const { party_id, created_by, name, codename, faction, danger, data } = req.body;
    const id = uuidv4();
    
    const { data: npc, error } = await supabase.from('npcs').insert({
      id, party_id, created_by, name, codename: codename || '', 
      faction: faction || 'neutro', danger: danger || 'medio', data: data || {}, is_global: false
    }).select().single();
    
    if (error) throw new Error(error.message);
    res.json(npc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete('/npcs/:id', async (req, res) => {
  try {
    const { error } = await supabase.from('npcs').delete().eq('id', req.params.id);
    if (error) throw new Error(error.message);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Session routes
app.get('/parties/:partyId/session', async (req, res) => {
  try {
    const { data, error } = await supabase.from('sessions').select('*').eq('party_id', req.params.partyId).order('created_at', { ascending: false }).limit(1).single();
    if (error) return res.json(null);
    res.json(data);
  } catch (e) {
    res.json(null);
  }
});

app.post('/parties/:partyId/session', async (req, res) => {
  try {
    const { title, notes, round, encounter } = req.body;
    
    const { data, error } = await supabase.from('sessions').upsert({
      party_id: req.params.partyId,
      title: title || '',
      notes: notes || '',
      round: round || 0,
      encounter: encounter || [],
      updated_at: new Date().toISOString()
    }).select().single();
    
    if (error) throw new Error(error.message);
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Serve static frontend
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
