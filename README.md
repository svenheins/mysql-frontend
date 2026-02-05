# MySQL Database Frontend

A modern, brutalist-inspired web interface for exploring MySQL databases with a sleek dark theme and intuitive user experience.

## Features

- 🔐 Secure MySQL connection interface
- 📊 Database selection with visual cards
- 📋 Users table viewer with modern design
- 📥 CSV export functionality
- ⚡ Real-time error handling and feedback
- 🎨 Responsive, modern UI with geometric patterns
- 🔥 Distinctive brutalist aesthetic

## Architecture

### Components

1. **MySQL Database** (Port 3306)
   - Pre-configured with two databases: `company_db` and `shop_db`
   - Each database contains a `users` table with sample data
   - Root user: `root` / Password: `dummypass123`

2. **Node.js Frontend** (Port 3000)
   - Express server with REST API
   - Static HTML/CSS/JavaScript frontend
   - Real-time MySQL connection management

## Quick Start

### Prerequisites

- Docker
- Docker Compose

### Installation & Run

1. Navigate to the project directory:
```bash
cd /home/claude
```

2. Start the services:
```bash
docker-compose up --build
```

3. Access the application:
   - Frontend: http://localhost:3000
   - MySQL: localhost:3306

### Default Credentials

- **Host**: `mysql` (or `localhost` if connecting from your machine)
- **Username**: `root`
- **Password**: `dummypass123`

## Usage

### Step 1: Connect to MySQL
1. Open http://localhost:3000 in your browser
2. Enter the connection credentials (pre-filled with defaults)
3. Click "Connect"

### Step 2: Select Database
1. Choose from available databases (`company_db` or `shop_db`)
2. Click on a database card to view its users table

### Step 3: View and Export Users
1. Browse the users table with all records
2. Click "Download as CSV" to export data
3. Use "Back to Databases" to switch databases
4. Use "Disconnect" to return to login

## Database Schema

### company_db.users
- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- username (VARCHAR(50))
- email (VARCHAR(100))
- full_name (VARCHAR(100))
- created_at (TIMESTAMP)

Sample users: Alice Wonderland, Bob Builder, Charlie Brown, Diana Prince, Edward Stark

### shop_db.users
- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- username (VARCHAR(50))
- email (VARCHAR(100))
- full_name (VARCHAR(100))
- created_at (TIMESTAMP)

Sample users: Frank Ocean, Grace Hopper, Henry Ford, Iris West, Jack Sparrow

## API Endpoints

### POST /api/connect
Connect to MySQL database
```json
{
  "host": "mysql",
  "user": "root",
  "password": "dummypass123"
}
```

### GET /api/databases
Get list of available databases (requires active connection)

### GET /api/users/:database
Get all users from specified database

### POST /api/disconnect
Disconnect from MySQL

## Error Handling

The application provides comprehensive error messages for:
- Connection failures (invalid credentials, unreachable host)
- Database access errors
- Query execution failures
- Network issues

All errors are displayed in styled alert boxes with clear, actionable messages.

## Design Features

### Visual Design
- **Typography**: Syne (display) and Space Mono (monospace) fonts
- **Color Scheme**: Dark theme with neon green accent (#00ff88)
- **Animations**: Smooth transitions, hover effects, and loading states
- **Layout**: Responsive grid system with brutalist aesthetic

### UX Features
- Status indicators showing connection state
- Record counts for data visibility
- Hover states on interactive elements
- Loading feedback during async operations
- Mobile-responsive design

## Development

### Project Structure
```
├── docker-compose.yml
├── init-db/
│   └── init.sql
└── frontend/
    ├── Dockerfile
    ├── package.json
    ├── server.js
    └── public/
        └── index.html
```

### Stopping Services
```bash
docker-compose down
```

### Rebuilding After Changes
```bash
docker-compose up --build
```

### Viewing Logs
```bash
docker-compose logs -f frontend
docker-compose logs -f mysql
```

## Testing MySQL Connection

You can test the MySQL connection directly using:

```bash
mysql -h localhost -P 3306 -u root -pdummypass123
```

Then run:
```sql
SHOW DATABASES;
USE company_db;
SELECT * FROM users;
```

## Customization

### Adding More Databases
Edit `init-db/init.sql` to add new databases and tables.

### Styling Changes
Modify the CSS variables in `frontend/public/index.html`:
```css
:root {
    --bg-primary: #0a0a0a;
    --accent: #00ff88;
    /* ... */
}
```

### Adding Features
- Extend `server.js` for new API endpoints
- Update `index.html` for UI changes
- Add more database operations (UPDATE, DELETE, INSERT)

## Security Notes

⚠️ This is a development/demonstration setup:
- Default credentials are used
- No authentication layer beyond MySQL
- MySQL port is exposed for testing
- Not suitable for production use

For production:
- Use environment variables for credentials
- Implement proper authentication
- Add HTTPS
- Restrict MySQL port access
- Use connection pooling
- Add rate limiting

## Troubleshooting

### MySQL Connection Issues
- Ensure MySQL container is healthy: `docker-compose ps`
- Check MySQL logs: `docker-compose logs mysql`
- Verify credentials in `docker-compose.yml`

### Frontend Not Loading
- Check if port 3000 is available
- View frontend logs: `docker-compose logs frontend`
- Ensure all dependencies installed: rebuild with `--build` flag

### Database Not Initialized
- Remove volumes: `docker-compose down -v`
- Restart: `docker-compose up --build`

## License

This is a demonstration project for educational purposes.
