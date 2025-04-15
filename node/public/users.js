document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const userTable = document.getElementById('userTable');

    updateTable(); //데이터요청청

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = username.value;
        
        console.log('생성할 이름 ', name);
        fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name})
        })
        
        username.value = '';
        updateTable();
    })

    function createButton(text, clickHandler) {
        const button = document.createElement('button');
        button.textContent = text
        button.addEventListener('click', clickHandler);
        return button;
    }

    function updateTable() {
        userTable.innerHTML = ''; //이전 내용 삭제

        fetch('/users')
            .then(res => res.json())
            .then(users => {
                for (const key in users) {
                    const row = document.createElement('div');
                    row.innerHTML = `<strong>ID:</strong> ${key},<strong>Name:</strong> ${users[key]}`

                    
                    row.appendChild(createButton('수정', () => editUser(key))); // row.appendChild 버튼 만들기 함수 
                    row.appendChild(createButton('삭제', () => deleteUser(key)));
                    userTable.appendChild(row);
                }
            })
    }



    function editUser(userId) {
        const newName = prompt('수정?');
        if (newName) {
            fetch(`/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName })
            })
            .then(res => {
                if (res.ok) {
                    updateTable(); // 테이블 새로고침해야 업데이트됨됨
                }
            });
        }
    }
    
    function deleteUser(userId) {
        fetch(`/users/${userId}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok) {
                updateTable(); // 테이블 새로고침
            }
        });
    }
});