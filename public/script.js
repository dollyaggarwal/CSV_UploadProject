document.addEventListener('DOMContentLoaded', () => {
    displayFileList();
  });
  
  async function displayFileList() {
    const fileListDiv = document.getElementById('fileList');
    fileListDiv.innerHTML = '';
  
    const response = await fetch('/uploads');
    const files = await response.json();
  
    files.forEach((file) => {
      const fileDiv = document.createElement('div');
      fileDiv.textContent = file.fileName;
      fileListDiv.appendChild(fileDiv);
      fileDiv.addEventListener('click', () => displayDataTable(file.filePath));
    });
  }
  
  async function displayDataTable(filePath) {
    const dataTableDiv = document.getElementById('dataTable');
    dataTableDiv.innerHTML = '';
  
    const response = await fetch(filePath);
    const data = await response.json();
  
    if (data.length === 0) {
      dataTableDiv.textContent = 'No data available.';
      return;
    }
  
    const table = document.createElement('table');
    const headerRow = table.insertRow();
  
    // Create table headers with sorting buttons
    Object.keys(data[0]).forEach((header) => {
      const th = document.createElement('th');
      th.textContent = header;
      th.addEventListener('click', () => sortTable(header));
      headerRow.appendChild(th);
    });
  
    data.forEach((row) => {
      const tr = table.insertRow();
      Object.values(row).forEach((value) => {
        const td = tr.insertCell();
        td.textContent = value;
      });
    });
  
    dataTableDiv.appendChild(table);
  }
  
  async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('csvFile', fileInput.files[0]);
  
    try {
      const response = await fetch('/uploads', {
        method: 'POST',
        body: formData,
      });
      console.log(response)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      alert(result.message);
  
      // Refresh file list after successful upload
      displayFileList();
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    }
  }
  
  function sortTable(column) {
    const table = document.querySelector('table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
  
    const sortOrder = table.getAttribute('data-sort-order') === 'asc' ? -1 : 1;
  
    rows.sort((a, b) => {
      const aValue = a.querySelector(`td:nth-child(${getHeaderIndex(column) + 1})`).textContent;
      const bValue = b.querySelector(`td:nth-child(${getHeaderIndex(column) + 1})`).textContent;
  
      if (isNaN(aValue) || isNaN(bValue)) {
        return sortOrder * aValue.localeCompare(bValue);
      } else {
        return sortOrder * (parseFloat(aValue) - parseFloat(bValue));
      }
    });
  
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  
    rows.forEach((row) => tbody.appendChild(row));
  
    // Toggle sort order for the next click
    table.setAttribute('data-sort-order', sortOrder === 1 ? 'asc' : 'desc');
  }
  
  function getHeaderIndex(column) {
    const table = document.querySelector('table');
    const headers = Array.from(table.querySelectorAll('th'));
  
    return headers.findIndex((header) => header.textContent === column);
  }
  