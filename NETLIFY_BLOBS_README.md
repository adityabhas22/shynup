# Netlify Blobs Integration

Your application now uses **Netlify Blobs** for data storage instead of a traditional database.

## How It Works

- **Store Name**: `service-requests`
- **Data Format**: JSON objects stored with service request IDs as keys
- **Automatic Setup**: Netlify handles provisioning and access control

## No Setup Required!

Netlify Blobs works automatically in Netlify Functions - no additional configuration needed from your side. The `getStore("service-requests")` call will work immediately when deployed to Netlify.

## Data Structure

Each service request is stored as JSON with this structure:
```json
{
  "id": "SR1234567890ABC",
  "requestId": "SR1234567890ABC",
  "city": "Bengaluru",
  "apartmentName": "Example Apartments",
  "flatNumber": "A-101",
  "services": "Basic Cleaning",
  "serviceDate": "2024-01-15",
  "status": "pending",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

## API Endpoints

- `POST /api/book-service` - Creates new service request
- `GET /api/service-requests` - Gets all requests
- `GET /api/service-requests/:id` - Gets specific request
- `PATCH /api/service-requests/:id/status` - Updates request status

## Benefits

✅ **Zero Configuration** - Works out of the box on Netlify
✅ **Serverless Optimized** - Designed for frequent reads, infrequent writes
✅ **Global CDN** - Fast access worldwide
✅ **Automatic Scaling** - Handles traffic spikes
✅ **No Database Costs** - Included with Netlify hosting

## Deployment

Just deploy to Netlify as usual - Netlify Blobs will work automatically! 🚀
