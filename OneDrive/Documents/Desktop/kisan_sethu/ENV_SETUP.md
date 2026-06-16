# Environment Configuration Guide

## Overview

This project uses `.env` files to manage all configuration. This allows you to:
- Keep secrets out of version control
- Use different settings for development, staging, and production
- Easily switch between environments

---

## Backend Configuration

### Location
```
backend/.env
```

### Setup Instructions

#### 1. Create `.env` file from template
```bash
cd backend
cp .env.example .env
```

#### 2. Get Gemini API Key
1. Visit: https://aistudio.google.com/app/apikeys
2. Click "Create API Key"
3. Copy the key
4. Update `.env`:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

#### 3. Generate JWT Secret (Production)
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```
Copy output and update `.env`:
```env
JWT_SECRET=<paste_the_generated_key>
```

#### 4. Update Database URL (if needed)
```env
# For SQLite (default)
DATABASE_URL=sqlite:///./kisansethu.db

# For PostgreSQL
DATABASE_URL=postgresql://user:password@localhost/dbname
```

---

## Frontend Configuration

### Location
```
frontend/.env.local
```

### Setup Instructions

#### 1. Create `.env.local` from template
```bash
cd frontend
cp .env.example .env.local
```

#### 2. Update Backend API URL
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

#### 3. Optional Feature Flags
```env
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_ENABLE_AI_GRADING=true
```

---

## Environment Variables Reference

### Backend

#### Gemini AI
| Variable | Default | Description |
|----------|---------|-------------|
| `GEMINI_API_KEY` | `None` | Google Gemini API key for AI quality grading |
| `GEMINI_MODEL` | `gemini-2.0-flash` | Gemini model version to use |

#### Database
| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `sqlite:///./kisansethu.db` | Database connection string |
| `DB_ECHO` | `false` | Log SQL queries (debug mode) |
| `DB_POOL_SIZE` | `5` | Database connection pool size |
| `DB_MAX_OVERFLOW` | `10` | Max overflow connections |

#### JWT & Authentication
| Variable | Default | Description |
|----------|---------|-------------|
| `JWT_SECRET` | `change-this-dev-secret` | Secret key for JWT signing |
| `JWT_ALGORITHM` | `HS256` | JWT signing algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `1440` | Token expiration time (24 hours) |
| `BCRYPT_ROUNDS` | `12` | Password hashing rounds |

#### App Configuration
| Variable | Default | Description |
|----------|---------|-------------|
| `APP_NAME` | `Kisan Sethu API` | Application name |
| `APP_VERSION` | `0.1.0` | Application version |
| `ENVIRONMENT` | `development` | Environment type |

#### CORS & Server
| Variable | Default | Description |
|----------|---------|-------------|
| `CORS_ORIGINS` | `http://localhost:3000,...` | Allowed CORS origins (comma-separated) |
| `ALLOWED_HOSTS` | `localhost,127.0.0.1,...` | Allowed host names |

#### File Upload
| Variable | Default | Description |
|----------|---------|-------------|
| `UPLOAD_DIR` | `uploads` | Directory for file uploads |
| `MAX_UPLOAD_SIZE_MB` | `50` | Max file upload size in MB |

#### API Endpoints
| Variable | Default | Description |
|----------|---------|-------------|
| `API_PREFIX` | `/api` | API prefix for all routes |
| `API_DOCS_URL` | `/docs` | Swagger documentation URL |
| `API_REDOC_URL` | `/redoc` | ReDoc documentation URL |

#### Logging
| Variable | Default | Description |
|----------|---------|-------------|
| `LOG_LEVEL` | `INFO` | Logging level (DEBUG, INFO, WARNING, ERROR) |

#### Production Settings
| Variable | Default | Description |
|----------|---------|-------------|
| `DEBUG` | `true` | Debug mode |
| `WORKERS` | `1` | Number of worker processes |

### Frontend

#### API Configuration
| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000/api` | Backend API endpoint |

#### App Configuration
| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_ENV` | `development` | Environment type |

#### Feature Flags
| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_ENABLE_AI_GRADING` | `true` | Enable AI quality grading feature |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | `false` | Enable analytics tracking |

---

## Checklist

### Before Running Locally
- [ ] Created `backend/.env` from `.env.example`
- [ ] Added Gemini API key to `backend/.env`
- [ ] Updated JWT secret in `backend/.env`
- [ ] Created `frontend/.env.local` from `.env.example`
- [ ] Backend API URL is correct in `frontend/.env.local`

### Before Deploying to Production
- [ ] Changed `ENVIRONMENT=production`
- [ ] Set `DEBUG=false`
- [ ] Generated secure `JWT_SECRET`
- [ ] Updated `CORS_ORIGINS` with production domain
- [ ] Updated `ALLOWED_HOSTS` with production domain
- [ ] Switched to PostgreSQL for `DATABASE_URL`
- [ ] Set `LOG_LEVEL=WARNING` (or ERROR)
- [ ] Updated `NEXT_PUBLIC_API_URL` to production backend

---

## Quick Start

### Development Environment

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env and add GEMINI_API_KEY
venv\Scripts\activate
python -m uvicorn app.main:app --reload --port 8000

# Frontend (new terminal)
cd frontend
npm run dev
# Visit http://localhost:3000
```

---

## Security Notes

⚠️ **Important:**
1. Never commit `.env` files to git
2. Always use strong `JWT_SECRET` in production
3. Use environment-specific `.env` files
4. Rotate API keys regularly
5. Use HTTPS in production
6. Keep `.env` files with restricted permissions

---

## Troubleshooting

### "Module not found" errors
```bash
# Backend
pip install -r requirements.txt

# Frontend
npm install
```

### API connection errors
Check `NEXT_PUBLIC_API_URL` in `frontend/.env.local` matches your backend URL.

### Database errors
Ensure `DATABASE_URL` is correct and database file has write permissions.

### CORS errors
Add your frontend URL to `CORS_ORIGINS` in `backend/.env`.

---

## Support

For more information, see:
- Backend: `/api/docs` (Swagger UI)
- Frontend: Check console in browser DevTools
