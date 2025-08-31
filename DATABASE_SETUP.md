# Database Setup Guide

## Neon DB Integration

Your application has been updated to use **Neon DB** (PostgreSQL) for persistent data storage instead of in-memory storage.

## Setup Steps

### 1. Create Neon DB Account

1. Go to [neon.tech](https://neon.tech)
2. Sign up for a free account
3. Create a new project

### 2. Get Database Connection String

1. In your Neon dashboard, go to your project
2. Click on "Connection Details"
3. Copy the connection string

### 3. Set Environment Variable

Create a `.env` file in your project root with:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

Replace with your actual Neon DB connection string.

### 4. Run Database Migration

Apply the database schema:

```bash
# Push the schema to your database
npx drizzle-kit push

# Or if you prefer migrations:
npx drizzle-kit migrate
```

### 5. Test the Connection

Start your development server:

```bash
npm run dev
```

### 6. Deploy to Netlify

When deploying to Netlify:

1. **Add Environment Variable**: In Netlify dashboard → Site Settings → Environment Variables
   - Key: `DATABASE_URL`
   - Value: Your Neon DB connection string

2. **Build Command**: `npm run build`

3. **Publish Directory**: `dist/spa`

## Features Now Available

✅ **Persistent Data Storage** - Service requests are saved permanently
✅ **Admin Panel** - View and manage all service requests
✅ **Status Updates** - Change request status (pending → confirmed → in-progress → completed)
✅ **Real-time Updates** - Changes reflect immediately
✅ **Scalable** - Works with multiple users and high traffic

## Database Schema

The `service_requests` table includes:

- `id` (auto-increment primary key)
- `request_id` (unique service request ID like SR1234567890ABCDE)
- `city`, `apartment_name`, `flat_number`
- `services` (service type selected)
- `service_date` (YYYY-MM-DD format)
- `status` (pending/confirmed/in-progress/completed/cancelled)
- `created_at`, `updated_at` (timestamps)

## API Endpoints

- `POST /api/book-service` - Submit new service request
- `GET /api/service-requests` - Get all requests (admin only)
- `GET /api/service-requests/:id` - Get specific request
- `PATCH /api/service-requests/:id/status` - Update request status

## Admin Panel

Access the admin panel at `/admin-only` with credentials:

- **Username:** `admin`
- **Password:** `shynup2024`

The admin panel will show all service requests with the ability to:

- View request details
- Update request status
- See creation/update timestamps
- Filter and search requests

## Troubleshooting

### Connection Issues

- Verify your `DATABASE_URL` is correct
- Make sure Neon DB allows connections from your IP
- Check if SSL mode is set to `require`

### Migration Issues

- Ensure your database user has CREATE privileges
- Run `npx drizzle-kit push` to apply schema changes

### Build Issues

- Make sure all dependencies are installed: `npm install`
- Verify TypeScript compilation: `npm run typecheck`
- Check server build: `npm run build:server`
