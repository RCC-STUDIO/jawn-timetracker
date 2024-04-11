/*
* This file contains the functions to access the database.
* The functions are asynchronous and use the fetch API to make requests to the server.
*/

// Access to shift cluster
/* 
* The getShifts function makes a GET request to the server to retrieve all the shifts.
* The function returns a list of shifts in JSON format.
* E.g.,
* [
*   {
*       "_id": "60f0f2f3b5d3b1f3c8e3f1a3",
*       "startDate": "2021-07-16T07:00:00.000Z",
*       "endDate": "2021-07-16T15:00:00.000Z",
*       "employee": "60f0f2f3b5d3b1f3c8e3f1a3",

]
*/
export const getShifts = async () => {
    try {
        const response = await fetch('https://localhost:3000/api/shifts', {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
};

/*
* The getShift function makes a GET request to the server to retrieve a shift by its id.
* The function returns a shift in JSON format.
* E.g., 
* {
*   "_id": "60f0f2f3b5d3b1f3c8e3f1a3",
*   "startDate": "2021-07-16T07:00:00.000Z",
*   "endDate": "2021-07-16T15:00:00.000Z",
*   "employee": "60f0f2f3b5d3b1f3c8e3f1a3",
*   "department": "60f0f2f3b5d3b1f3c8e3f1a3",
*   "status": "60f0f2f3b5d3b1f3c8e3f1a3"
* }
*/
export const getShift = async (id) => {
    try {
        const response = await fetch(`https://localhost:3000/api/shifts/${id}`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
};

/*
* The createShift function makes a POST request to the server to create a new shift.
* The function takes a shift object as an argument and returns a message in JSON format.
* E.g.,
* {
*   "message": "Shift created"
* }
*/
export const createShift = async (shift) => {
    try {
        const response = await fetch('https://localhost:3000/api/shifts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(shift),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
}

/*
* The updateShift function makes a PUT request to the server to update a shift by its id.
* The function takes an id and a shift object as arguments and returns a message in JSON format.
* E.g.,
* {
*   "message": "Shift updated"
* }
*/
export const updateShift = async (id, shift) => {
    try {
        const response = await fetch(`https://localhost:3000/api/shifts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(shift),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
};

/*
* The deleteShift function makes a DELETE request to the server to delete a shift by its id.
* The function takes an id as an argument and returns a message in JSON format.
* E.g.,
* {
*   "message": "Shift deleted"
* }
*/
export const deleteShift = async (id) => {
    try {
        const response = await fetch(`https://localhost:3000/api/shifts/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
};

// Access to user cluster
/* 
* The getUsers function makes a GET request to the server to retrieve all the users.
* The function returns a list of users in JSON format.
* E.g.,
* [
*   {
*       "_id": "60f0f2f3b5d3b1f3c8e3f1a3",
*       "username": "gleclerc12",
*       "password": "$2b$10$gssxvIKca.ZcYSeYGBp02.bPUUM2k4oO4oKzbX6qxH3hH/oaEOrHm", // hashed password
*       "email": "gabriel.leclerc@edu.sait.ca",
*       "employee_id": "65f76489793f04d0393c108c",
*       "createdAt": "2024-03-17T23:20:46.401Z",
*       "updatedAt": "2024-03-17T23:20:46.401Z",
*       "__v": 0
*   },
*   {
*       "_id": "65f77b164b0398b58845e38d",
*       "username": "msimms12",
*       "password": "$2b$10$6PfjXJ1hkt5C2h0a5O5xh.5NLLcJ31Cs4MBO/CLfArD8TnehLMkO6",
*       "email": "matthew.simms@edu.sait.ca",
*       "employee_id": "65f764cd793f04d0393c108e",
*       "createdAt": "2024-03-17T23:21:58.797Z",
*       "updatedAt": "2024-03-17T23:21:58.797Z",
*       "__v": 0
*   }
*/
export const getUsers = async () => {
    try {
        const response = await fetch('https://localhost:3000/api/users', {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
};

/*
* The getUser function makes a GET request to the server to retrieve a user by its id.
* The function returns a user in JSON format.
* E.g.,
* {
*   "_id": "60f0f2f3b5d3b1f3c8e3f1a3",
*   "username": "gleclerc12",
*   "password": "$2b$10$gssxvIKca.ZcYSeYGBp02.bPUUM2k4oO4oKzbX6qxH3hH/oaEOrHm", // hashed password
*   "email": "gabriel.leclerc@edu.sait.ca",
*   "employee_id": "65f76489793f04d0393c108c",
*   "createdAt": "2024-03-17T23:20:46.401Z",
*   "updatedAt": "2024-03-17T23:20:46.401Z",
*   "__v": 0
* }
*/
export const getUser = async (id) => {
    try {
        const response = await fetch(`https://localhost:3000/api/users/${id}`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
}

/*
* The createUser function makes a POST request to the server to create a new user.
* The function takes a user object as an argument and returns a message in JSON format.
* E.g.,
* {
*   "message": "User created"
* }
*/
export const createUser = async (user) => {
    try {
        const response = await fetch('https://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
}

/*
* The updateUser function makes a PUT request to the server to update a user by its id.
* The function takes an id and a user object as arguments and returns a message in JSON format.
* E.g.,
* {
*   "message": "User updated"
* }
*/
export const updateUser = async (id, user) => {
    try {
        const response = await fetch(`https://localhost:3000/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
};

/*
* The deleteUser function makes a DELETE request to the server to delete a user by its id.
* The function takes an id as an argument and returns a message in JSON format.
* E.g.,
* {
*   "message": "User deleted"
* }
*/
export const deleteUser = async (id) => {
    try {
        const response = await fetch(`https://localhost:3000/api/users/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
}


// Access to request cluster
/*
* 5 Statuses for requests:
* pending: the request has been sent to the second employee
* requested: the request has been sent to management
* dropped: the shift has been dropped
* swapped: the shifts have been swapped
* completed: the request has been complete
* 
* Shift swaps:
* 1. First employee sends request to second employee (pending)
* 2. Second employee [next_employee_id] 
*    a) accepts the request: the request is sent to management. (requested)
*    b) declines the request: the request is declined and employee is notified. (completed)
* 3. Management
*    a) accepts the request: the request is complete and employees are notified. (swapped)
*    b) declines the request: the request is declined and employees are notified. (completed)
* 
* Shift drops:
* 1. Employee sends request to management (requested)
* 2. Management
*    a) accepts the request: the request is complete and employee is notified. (dropped)
*    b) declines the request: the request is declined and employee is notified. (completed)
*/

/* 
* The getRequests function makes a GET request to the server to retrieve all the requests.
* The function returns a list of requests in JSON format.
* E.g.,
* [
*   {
*       "_id": "65fb8ab39c74382707603d8e",
*       "first_shift_id": "65f76b10793f04d0393c1095",
*       "second_shift_id": "65f49f3887821c0bd76b4a1c",
*       "next_employee_id": "65f76489793f04d0393c108c",
*       "department_id": "65f49f3887821c0bd76b4a1c",
*       "status": "Pending",
*       "createdAt": "2024-03-21T01:17:39.635Z",
*       "updatedAt": "2024-03-21T01:17:39.635Z",
*       "__v": 0
*   },
*   {
*       "_id": "65fb8ab39c74382707603d8e",
*       "first_shift_id": "65f76b10793f04d0393c1095",
*       "second_shift_id": "65f49f3887821c0bd76b4a1c",
*       "next_employee_id": "65f76489793f04d0393c108c",
*       "department_id": "65f49f3887821c0bd76b4a1c",
*       "status": "Pending",
*       "createdAt": "2024-03-21T01:17:39.635Z",
*       "updatedAt": "2024-03-21T01:17:39.635Z",
*       "__v": 0
*   }
]
*/
export const getRequests = async () => {
    try {
        const response = await fetch('https://localhost:3000/api/requests', {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
};

/*
* The getRequest function makes a GET request to the server to retrieve a request by its id.
* The function returns a request in JSON format.
* E.g.,
* {
*   "_id": "65fb8ab39c74382707603d8e",
*   "first_shift_id": "65f76b10793f04d0393c1095",
*   "second_shift_id": "65f49f3887821c0bd76b4a1c",
*   "next_employee_id": "65f76489793f04d0393c108c",
*   "department_id": "65f49f3887821c0bd76b4a1c",
*   "status": "Pending",
*   "createdAt": "2024-03-21T01:17:39.635Z",
*   "updatedAt": "2024-03-21T01:17:39.635Z",
*   "__v": 0
* }
*/
export const getRequest = async (id) => {
    try {
        const response = await fetch(`https://localhost:3000/api/requests/${id}`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
};

/*
* The createRequest function makes a POST request to the server to create a new request.
* The function takes a request object as an argument and returns a message in JSON format.
* E.g.,
* {
*   "message": "Request created"
* }
*/
export const createRequest = async (request) => {
    try {
        const response = await fetch('https://localhost:3000/api/requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
};

/*
* The updateRequest function makes a PUT request to the server to update a request by its id.
* The function takes an id and a request object as arguments and returns a message in JSON format.
* E.g.,
* {
*   "message": "Request updated"
* }
*/
export const updateRequest = async (id, request) => {
    try {
        const response = await fetch(`https://localhost:3000/api/requests/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
};

/*
* The deleteRequest function makes a DELETE request to the server to delete a request by its id.
* The function takes an id as an argument and returns a message in JSON format.
* E.g.,
* {
*   "message": "Request deleted"
* }
*/
export const deleteRequest = async (id) => {
    try {
        const response = await fetch(`https://localhost:3000/api/requests/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
};

// Access to employee cluster
/*
* The getEmployees function makes a GET request to the server to retrieve all the employees.
* The function returns a list of employees in JSON format.
* E.g.,
* [
*   {
*       "_id": "65f76489793f04d0393c108c",
*       "firstName": "Gabriel",
*       "lastName": "Leclerc",
*       "department": "65f49f3887821c0bd76b4a1c",
*       "isManager": false,
*       "createdAt": "2024-03-17T23:20:46.401Z",
*       "updatedAt": "2024-03-17T23:20:46.401Z",
*       "__v": 0
*   },
*   {
*       "_id": "65f764cd793f04d0393c108e",
*       "firstName": "Matthew",
*       "lastName": "Simms",
*       "department": "65f49f3887821c0bd76b4a1c",
*       "isManager": false,
*       "createdAt": "2024-03-17T23:21:58.797Z",
*       "updatedAt": "2024-03-17T23:21:58.797Z",
*       "__v": 0
*   }
* ]
*/
export const getEmployees = async () => {
    try {
        const response = await fetch('https://localhost:3000/api/employees', {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
};

/*
* The getEmployee function makes a GET request to the server to retrieve an employee by its id.
* The function returns an employee in JSON format.
* E.g.,
* {
*   "_id": "65f76489793f04d0393c108c",
*   "firstName": "Gabriel",
*   "lastName": "Leclerc",
*   "department": "65f49f3887821c0bd76b4a1c",
*   "isManager": false,
*   "createdAt": "2024-03-17T23:20:46.401Z",
*   "updatedAt": "2024-03-17T23:20:46.401Z",
*   "__v": 0
* }
*/
export const getEmployee = async (id) => {
    try {
        const response = await fetch(`https://localhost:3000/api/employees/${id}`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
};

/*
* The createEmployee function makes a POST request to the server to create a new employee.
* The function takes an employee object as an argument and returns a message in JSON format.
* E.g.,
* {
*   "message": "Employee created"
* }
*/
export const createEmployee = async (employee) => {
    try {
        const response = await fetch('https://localhost:3000/api/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
};

/*
* The updateEmployee function makes a PUT request to the server to update an employee by its id.
* The function takes an id and an employee object as arguments and returns a message in JSON format.
* E.g.,
* {
*   "message": "Employee updated"
* }
*/
export const updateEmployee = async (id, employee) => {
    try {
        const response = await fetch(`https://localhost:3000/api/employees/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
};

/*
* The deleteEmployee function makes a DELETE request to the server to delete an employee by its id.
* The function takes an id as an argument and returns a message in JSON format.
* E.g.,
* {
*   "message": "Employee deleted"
* }
*/
export const deleteEmployee = async (id) => {
    try {
        const response = await fetch(`https://localhost:3000/api/employees/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
};

// Access to department cluster
/*
* The getDepartments function makes a GET request to the server to retrieve all the departments.
* The function returns a list of departments in JSON format.
* E.g.,
* [
*   {
*       "_id": "65f49f3887821c0bd76b4a1c",
*       "department": "Produce",
*       "createdAt": "2024-03-17T23:19:12.288Z",
*       "updatedAt": "2024-03-17T23:19:12.288Z",
*       "__v": 0
*   },
*   {
*       "_id": "65f49f3887821c0bd76b4a1c",
*       "department": "Frontend",
*       "createdAt": "2024-03-17T23:19:12.288Z",
*       "updatedAt": "2024-03-17T23:19:12.288Z",
*       "__v": 0
*   }
* ]
*/
export const getDepartments = async () => {
    try {
        const response = await fetch('https://localhost:3000/api/departments', {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
};

/*
* The getDepartment function makes a GET request to the server to retrieve a department by its id.
* The function returns a department in JSON format.
* E.g.,
* {
*   "_id": "65f49f3887821c0bd76b4a1c",
*   "department": "Produce",
*   "createdAt": "2024-03-17T23:19:12.288Z",
*   "updatedAt": "2024-03-17T23:19:12.288Z",
*   "__v": 0
* }
*/
export const getDepartment = async (id) => {
    try {
        const response = await fetch(`https://localhost:3000/api/departments/${id}`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
};

/*
* The createDepartment function makes a POST request to the server to create a new department.
* The function takes a department object as an argument and returns a message in JSON format.
* E.g.,
* {
*   "message": "Department created"
* }
*/
export const createDepartment = async (department) => {
    try {
        const response = await fetch('https://localhost:3000/api/departments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(department),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
};

/*
* The updateDepartment function makes a PUT request to the server to update a department by its id.
* The function takes an id and a department object as arguments and returns a message in JSON format.
* E.g.,
* {
*   "message": "Department updated"
* }
*/
export const updateDepartment = async (id, department) => {
    try {
        const response = await fetch(`https://localhost:3000/api/departments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(department),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
};

/*
* The deleteDepartment function makes a DELETE request to the server to delete a department by its id.
* The function takes an id as an argument and returns a message in JSON format.
* E.g.,
* {
*   "message": "Department deleted"
* }
*/
export const deleteDepartment = async (id) => {
    try {
        const response = await fetch(`https://localhost:3000/api/departments/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    } catch (error) {
        console.error(error);
    }
};
