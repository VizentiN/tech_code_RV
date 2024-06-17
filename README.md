# RamenGo

## Description
RamenGo is an online platform for customizing and ordering ramen. Users can select from various broth types and proteins to create their perfect ramen. Upon completing their selection and confirming the order, users are redirected to a page indicating that the establishment is preparing their order and it will be delivered shortly.

## Technologies Used
- Backend: Django, Poetry
- Frontend: HTML, JavaScript, SCSS

## Project Structure

### Backend
The backend uses Django for the server-side logic and Poetry for dependency management. It includes:
- Models for broths and proteins.
- Views and serializers for API interactions.

### Frontend
The frontend is crafted using:
- HTML for structure.
- SCSS for styles.
- JavaScript for interactive elements.

## Setup and Installation

```bash
# Clone the repository
git clone https://github.com/VizentiN/tech_code_RV.git

# Navigate to the project directory
cd ramengo

# Install dependencies
poetry install

# Run migrations
poetry run python manage.py migrate

# Start the server
poetry run python manage.py runserver

# Open another terminal for frontend setup
# Navigate to the frontend directory
cd ramengo-frontend

# Install SCSS dependencies
npm install

# Compile SCSS to CSS
npm run dev

# Open the application in your browser
```

## Testing

# Testing is implemented for both views and serializers to ensure the integrity of backend functionalities.

```
# Run tests
poetry run python manage.py test api.tests
```

## Author
* Lucas Vizentin
