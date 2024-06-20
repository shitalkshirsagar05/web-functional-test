document.getElementById('startRecording').addEventListener('click', function() {
    // Add code for voice recording functionality here
    alert('Voice recording functionality not implemented yet.');
    
});

document.getElementById('copy').addEventListener('click', function() {
    let textbox = document.getElementById('textbox');
    textbox.select();
    document.execCommand('copy');
    
});

document.getElementById('clear').addEventListener('click', function() {
    document.getElementById('textbox').value = '';

});