let qrCode = null;

const textInput = document.getElementById('textInput');
const generateBtn = document.getElementById('generateBtn');
const qrContainer = document.getElementById('qrContainer');
const qrCodeDiv = document.getElementById('qrcode');
const downloadBtn = document.getElementById('downloadBtn');
const clearBtn = document.getElementById('clearBtn');

// Generate QR code when button is clicked
generateBtn.addEventListener('click', generateQRCode);

// Generate QR code when Enter key is pressed
textInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateQRCode();
    }
});

// Clear QR code
clearBtn.addEventListener('click', clearQRCode);

// Download QR code
downloadBtn.addEventListener('click', downloadQRCode);

function generateQRCode() {
    const text = textInput.value.trim();

    if (text === '') {
        alert('Please enter a URL or text!');
        return;
    }

    // Clear previous QR code if exists
    qrCodeDiv.innerHTML = '';

    // Generate new QR code
    qrCode = new QRCode(qrCodeDiv, {
        text: text,
        width: 256,
        height: 256,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    // Show QR container
    qrContainer.classList.remove('hidden');
}

function clearQRCode() {
    qrCodeDiv.innerHTML = '';
    qrContainer.classList.add('hidden');
    textInput.value = '';
    textInput.focus();
}

function downloadQRCode() {
    const canvas = qrCodeDiv.querySelector('canvas');
    const img = qrCodeDiv.querySelector('img');

    if (canvas) {
        // If canvas exists, use it
        const url = canvas.toDataURL('image/png');
        downloadImage(url);
    } else if (img) {
        // If image exists, use it
        downloadImage(img.src);
    } else {
        alert('Please generate a QR code first!');
    }
}

function downloadImage(url) {
    const link = document.createElement('a');
    const timestamp = new Date().getTime();
    link.download = `qrcode-${timestamp}.png`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
