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

// main.js

async function downloadFile() {
    try {
      // Send a request to the server to initiate the file download
      const response = await fetch('/user/download');
  
      // Assuming the file is sent as an attachment in the response
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      // Create a link and trigger a click to download the file
      const a = document.createElement('a');
      a.href = url;
      a.download = 'downloaded-file'; // You can set the desired filename here
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  
      // Release the object URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error during file download:', error);
      alert('File download failed');
    }
  }
  
