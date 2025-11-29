// أضف هذا الكود في backend/server.mjs بعد endpoint /api/auth/login

// Register new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    
// Validate the inputs     if (!email || !password) {
      return res.status(400).json({ error: 'MISSING_FIELDS' });
    }
    
    if (password.length < 8) {
      return res.status(400).json({ error: 'PASSWORD_TOO_SHORT' });
    }

    const db = await initMongo();

// Check that the user does not already exist    const existingUser = await db.collection('users').findOne({
      $or: [
        { email: email },
        ...(phone ? [{ phone: phone }] : [])
      ]
    });

    if (existingUser) {
      return res.status(409).json({ error: 'EMAIL_EXISTS' });
    }

// Create the new user    const now = new Date();
    const hash = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      phone: phone || null,
      passwordHash: hash,
      role: ROLES.USER, // دور عادي (ليس admin)
      createdAt: now,
      lastLoginAt: null,
      activeSessionSince: null,
    };

    const result = await db.collection('users').insertOne(newUser);

    return res.json({
      ok: true,
      userId: result.insertedId.toString(),
      message: 'User created successfully'
    });

  } catch (err) {
    console.error('register err', err);
    res.status(500).json({ error: 'SERVER_ERR' });
  }
});
