// main.js
async function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
  
    const response = await fetch('/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    const result = await response.json();
    alert(result.message);
}

async function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
  
    try {
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        // Assuming login is successful
        window.location.href = '/user/home';
    } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed'); // Show an alert or handle the error
    }
}

function showLoginForm() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

async function uploadFile() {
    try {
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];

        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/user/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error during file upload:', error);
        alert('File upload failed');
    }
}
