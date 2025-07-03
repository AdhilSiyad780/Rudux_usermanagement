🛠️ User Management API – Django REST Framework
This project is a robust User Management System built using Django REST Framework (DRF). It features full CRUD functionality for users, admin-only controls, authentication using JWT, and user profile image uploads. The backend serves as a RESTful API that can be consumed by any frontend—React, Angular, mobile apps, or even FastAPI-based microservices.

📌 Features
✅ JWT Authentication (via SimpleJWT)

✅ Admin & User Role-Based Access

✅ Login / Register Endpoints

✅ User CRUD (Create, Read, Update, Delete)

✅ Profile Image Upload

✅ Search and Filter Users

✅ Pagination & Throttling

✅ Browsable DRF Interface

✅ Modular, Scalable Architecture

🚀 Technology Stack
Layer	Technology
Backend	Django REST Framework
Auth	JWT (SimpleJWT)
Database	PostgreSQL / SQLite
Media Files	Django Media Storage
Deployment	Docker / Gunicorn (optional)

🔧 Project Structure
bash
Copy
Edit
/usermanagement/
│
├── users/                  # Custom User App
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── permissions.py
│
├── usermanagement/         # Django settings & routing
│   ├── settings.py
│   ├── urls.py
│
├── media/                  # Uploaded profile images
├── manage.py
🔐 Authentication
JWT is used for secure stateless authentication.

Two types of tokens are issued: access and refresh.

Middleware ensures only authenticated users can access protected routes.

Admin users get additional privileges to manage all users.

🧠 Role-Based Access
Role	Permissions
Admin	Full access to CRUD all users
User	Can only view/edit own profile

📷 Profile Image Upload
Users can upload and update their profile pictures.

Uploaded files are stored in Django’s MEDIA_ROOT.

Accessible via /media/ URL when DEBUG=True.

🔍 Search & Filter
Search users by username or email using query parameters.

Add filters like active/inactive status for admin use.

🧪 Testing the API
Use tools like Postman, cURL, or the DRF Browsable API at:

bash
Copy
Edit
http://localhost:8000/api/
⚡ FastAPI Comparison (Optional Section)
If you're integrating with or comparing to FastAPI:

Feature	Django REST Framework	FastAPI
Admin Panel	Built-in	Manual implementation
ORM	Django ORM	SQLAlchemy / Tortoise
Speed	Moderate	Very High (async support)
Type Hints	Optional	Required & Enforced
Use Case	Full-stack apps	Microservices & APIs

Use DRF when building a full-featured admin app; choose FastAPI for async microservices.

📦 Installation & Setup
bash
Copy
Edit
# Clone the repository
git clone https://github.com/yourusername/usermanagement-api.git
cd usermanagement-api

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver
✅ API Endpoints Overview
Endpoint	Method	Description
/api/register/	POST	Register new user
/api/login/	POST	JWT login
/api/users/	GET	Admin-only: List users
/api/users/<id>/	GET/PUT/DELETE	Admin: View/edit/delete user
/api/profile/	GET/PUT	Logged-in user profile
/api/profile/upload/	POST	Upload profile image

🔒 Environment Variables
Set these in a .env file:

env
Copy
Edit
DEBUG=True
SECRET_KEY=your_django_secret
DATABASE_URL=postgres://user:pass@localhost/dbname
📄 License
This project is licensed under the MIT License. Feel free to use and modify for personal or commercial purposes.

🙋‍♂️ Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change or enhance.
