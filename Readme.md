User Registration

Description:
Allows users to create an account by providing their name, email, and password.

Method:
POST

Endpoint:
/api/register

Request Body:

json

{
  "name": "string",
  "email": "string",
  "password": "string"
}

Response:

    201 Created: User account successfully created.
    400 Bad Request: If the email already exists.
    500 Internal Server Error: If there's a server-side issue.

User Login

Description:
Allows registered users to log in and obtain a JWT token for authentication.

Method:
POST

Endpoint:
/api/login

Request Body:

json

{
  "email": "string",
  "password": "string"
}

Response:

    201 Created: JWT token generated successfully.
    401 Unauthorized: If the credentials are invalid.
    500 Internal Server Error: If there's a server-side issue.

Get All Flights

Description:
Returns a list of all available flights.

Method:
GET

Endpoint:
/api/flights

Response:

    200 OK: Returns a list of flights.
    500 Internal Server Error: If there's a server-side issue.

Get Flight by ID

Description:
Returns the details of a specific flight identified by its ID.

Method:
GET

Endpoint:
/api/flights/:id

Response:

    200 OK: Returns the details of the requested flight.
    404 Not Found: If the flight with the provided ID doesn't exist.
    500 Internal Server Error: If there's a server-side issue.

Add New Flight

Description:
Allows authorized users to add new flights to the system.

Method:
POST

Endpoint:
/api/flights

Authorization:
Bearer token

Request Body:

json

{
  "airline": "string",
  "flightNo": "string",
  "departure": "string",
  "arrival": "string",
  "departureTime": "date",
  "arrivalTime": "date",
  "seats": "number",
  "price": "number"
}

Response:

    201 Created: New flight added successfully.
    500 Internal Server Error: If there's a server-side issue.

Update Flight by ID

Description:
Allows authorized users to update the details of a specific flight identified by its ID.

Method:
PUT / PATCH

Endpoint:
/api/flights/:id

Authorization:
Bearer token

Request Body:

json

{
  // Fields to be updated
}

Response:

    204 No Content: Flight details updated successfully.
    404 Not Found: If the flight with the provided ID doesn't exist.
    500 Internal Server Error: If there's a server-side issue.

Delete Flight by ID

Description:
Allows authorized users to delete a specific flight identified by its ID.

Method:
DELETE

Endpoint:
/api/flights/:id

Authorization:
Bearer token

Response:

    202 Accepted: Flight deleted successfully.
    404 Not Found: If the flight with the provided ID doesn't exist.
    500 Internal Server Error: If there's a server-side issue.
    