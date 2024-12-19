# Medium Clone

This is a Medium-like blogging platform built with modern web technologies. It allows users to create, edit, and share articles, as well as interact with others through comments and likes.

## Features
- **Authentication**: Secure user authentication using JWT.
- **Blog Management**: Users can create, edit, delete, and view blogs.
- **Comments**: Add and manage comments on articles.
- **Responsive Design**: Fully responsive UI built with React.
- **Type Safety**: Zod and TypeScript ensure type-safe development.

## Tech Stack
- **Frontend**: React, TypeScript
- **Backend**: Cloudflare Workers (Serverless)
- **Validation**: Zod
- **Database**: PostgreSQL
- **ORM**: Prisma (with connection pooling)
- **Authentication**: JSON Web Tokens (JWT)

## Getting Started
Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v16+ recommended)
- PostgreSQL installed and running locally
- Cloudflare account for Workers setup

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Aditya6112/Medium-clone.git
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory with the following values:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/medium_clone
   JWT_SECRET=your_secret_key
   CF_ACCOUNT_ID=your_cloudflare_account_id
   CF_API_TOKEN=your_cloudflare_api_token
   ```

4. **Set up the database:**
   Run Prisma migrations to create the database schema:
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:3000` and backend at your configured Cloudflare Workers endpoint.

### Cloudflare Workers Setup
1. Install the Cloudflare CLI:
   ```bash
   npm install -g wrangler
   ```

2. Authenticate with Cloudflare:
   ```bash
   wrangler login
   ```

3. Deploy the Workers:
   ```bash
   npm run deploy
   ```

## Scripts
- `npm run dev`: Start the development environment.
- `npm run build`: Build the project for production.
- `npm run deploy`: Deploy Cloudflare Workers.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push the changes to your fork.
5. Open a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

---

Feel free to explore the project and reach out if you have any questions or suggestions!
