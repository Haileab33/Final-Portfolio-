# Admin Dashboard Setup Guide

This guide will help you set up and use the admin dashboard for managing your portfolio website.

## Prerequisites

- Node.js installed
- npm or yarn package manager

## Installation

1. **Install Dependencies**

   Due to PowerShell execution policy restrictions, you may need to run this manually in your terminal:

   ```bash
   npm install jsonwebtoken bcryptjs cors date-fns react-dropzone react-hook-form react-hot-toast concurrently
   npm install -D @types/bcryptjs @types/cors @types/jsonwebtoken
   ```

2. **Environment Configuration**

   Copy `.env.example` to `.env` and configure your settings:

   ```bash
   cp .env.example .env
   ```

   Update the following variables in `.env`:

   ```env
   # Admin Dashboard Configuration
   ADMIN_JWT_SECRET="your-super-secret-jwt-key-change-in-production"
   ADMIN_EMAIL="admin@example.com"
   ADMIN_PASSWORD_HASH="$2a$10$YourHashedPasswordHere"
   ADMIN_PORT=3001
   SESSION_TIMEOUT=86400
   ```

   **Important**: For production, generate a secure JWT secret and hash your password using bcrypt.

3. **Generate Password Hash (Optional)**

   To generate a bcrypt hash for your password:

   ```bash
   node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-password', 10));"
   ```

## Running the Application

### Development Mode

Run both the frontend and backend server simultaneously:

```bash
npm run dev:all
```

This will start:
- Vite dev server on port 3000
- Admin API server on port 3001

### Individual Servers

If you prefer to run them separately:

```bash
# Frontend only
npm run dev

# Backend API only
npm run server
```

## Accessing the Admin Dashboard

1. Navigate to `http://localhost:3000/admin/login`
2. Login with your credentials (default: `admin@example.com` / `admin123`)
3. You'll be redirected to the dashboard

## Features

### Dashboard Overview
- View statistics (projects, skills, certifications)
- Quick action buttons
- System status indicators

### Personal Information
- Edit name, title, subtitle
- Update contact details (email, phone, location)
- Manage social media links
- Edit bio/description

### Skills Management
- Add/edit/delete skill categories
- Modify skill names and proficiency levels
- Visual progress bar preview
- Reorder skills within categories

### Projects Management
- Full CRUD operations for projects
- Edit project details (title, description, links)
- Manage tech stack tags
- Set featured status
- Category assignment
- Delete projects with confirmation

### Experience Management
- Add/edit/delete experience entries
- Edit company, role, duration
- Manage bullet-point descriptions
- Add/remove responsibilities

### Education Management
- Add/edit/delete education entries
- Edit institution, degree, duration
- Add descriptions

### Testimonials Management
- Add/edit/delete testimonials
- Edit client name, role, and content

### Certifications Management
- Add/edit/delete certifications
- Simple text list management

### Settings
- General settings (site name)
- SEO settings (meta title, description, keywords)
- Theme settings (default theme, accent color)

## Data Storage

All content is stored in JSON files in the `src/data/` directory:
- `personal-info.json`
- `skills.json`
- `projects.json`
- `experience.json`
- `education.json`
- `testimonials.json`
- `certifications.json`
- `settings.json`

## API Endpoints

### Authentication
- `POST /api/admin/login` - Login
- `GET /api/admin/verify` - Verify token
- `POST /api/admin/logout` - Logout

### Content
- `GET /api/content/personal-info` - Get personal info
- `PUT /api/content/personal-info` - Update personal info
- `GET /api/content/skills` - Get skills
- `PUT /api/content/skills` - Update skills
- `GET /api/content/projects` - Get projects
- `POST /api/content/projects` - Create project
- `PUT /api/content/projects/:id` - Update project
- `DELETE /api/content/projects/:id` - Delete project
- Similar endpoints for experience, education, testimonials, certifications

### Settings
- `GET /api/settings` - Get settings
- `PUT /api/settings` - Update settings

## Security Notes

⚠️ **Important Security Considerations:**

1. **Change Default Credentials**: The default password is `admin123`. Change this immediately in production.

2. **JWT Secret**: Use a strong, random JWT secret in production. Generate one using:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Environment Variables**: Never commit `.env` to version control. Use `.env.example` as a template.

4. **HTTPS**: Use HTTPS in production to protect credentials in transit.

5. **Rate Limiting**: Consider adding rate limiting to the login endpoint to prevent brute force attacks.

6. **Password Hashing**: In production, use bcrypt to hash passwords. The current implementation uses simple comparison for development.

## Deployment

### For GitHub Pages

Since GitHub Pages is static hosting, the admin API server won't work in production. Options:

1. **Use a separate backend service** (Render, Railway, Heroku, etc.)
2. **Use a headless CMS** (Contentful, Strapi, etc.)
3. **Use GitHub Actions** to rebuild on JSON file changes

### Recommended Production Setup

1. Deploy the backend API to a service like Render or Railway
2. Update the API base URL in `src/admin/services/api.ts`
3. Use environment variables for production configuration
4. Enable HTTPS
5. Set up proper authentication

## Troubleshooting

### Server won't start
- Check if port 3001 is already in use
- Verify all dependencies are installed
- Check environment variables are set

### Login fails
- Verify credentials in `.env`
- Check JWT secret matches between client and server
- Ensure server is running on port 3001

### Changes not saving
- Check server console for errors
- Verify API endpoints are accessible
- Check browser console for network errors

### CORS errors
- Ensure CORS is configured in the server
- Check API base URL in `src/admin/services/api.ts`

## Future Enhancements

Potential features to add:
- Image upload functionality
- Media library management
- Version history/rollback
- Multi-user support with roles
- Analytics dashboard
- Scheduled content publishing
- Webhook notifications
- Export/Import functionality

## Support

For issues or questions:
1. Check the console for error messages
2. Review the API endpoints in `src/server/routes/`
3. Verify data files in `src/data/`
4. Check environment configuration

## License

This admin dashboard is part of your portfolio project. Use and modify as needed.
