const dot_row = 8;
const dot_col = 8;

const portA = 255;
const portF = 0;

function default_load() {
    console.log('on load.');

    let dot_tr;
    let dot_td;

    for(let i = 0; i < dot_row; i++) {
        dot_tr = document.createElement("tr");
        dot_tr.id = 'dot-tr' + (i + 1).toString();
        dot_tr.classList.add('dot-tr');

        for(let j = 0; j < dot_col; j++) {
            dot_td = document.createElement("td");
            dot_td.id = 'dot-td' + (j + 1).toString();
            dot_td.classList.add('dot-td');
            dot_td.textContent = 0;
            dot_td.addEventListener("click", function() {
                matrix_on(i, j);
            });

            dot_tr.append(dot_td);
        }
        document.getElementById("dot-matrix-table-main").append(dot_tr);
    }
    document.getElementById('dot-matrix-setting-reset').addEventListener("click", matrix_reset);
    document.getElementById('dot-matrix-setting-cross').addEventListener("click", set_check_cross);
    matrix_array_set();
}

//매트리스를 클릭하면 실행되는 함수
function matrix_on(col, row) {
    console.log(col + ", " + row);
    let this_td = document.getElementById("dot-tr"+(col+1)).getElementsByClassName("dot-td")[parseInt(row)];
    let this_text = this_td.textContent;

    if(this_text == '0') {
        document.getElementById("dot-tr"+(col+1)).getElementsByClassName("dot-td")[parseInt(row)].textContent = '1';
        matrix_color(col, row, 1);
    } else {
        document.getElementById("dot-tr"+(col+1)).getElementsByClassName("dot-td")[parseInt(row)].textContent = '0';
        matrix_color(col, row, 0);
    }

    matrix_array_set();
}

//매트리스 배열을 설정하는 함수
function matrix_array_set() {
    console.log('set');
    let cross_flag = check_cross();

    let dot_col_arr = [];
    let dot_row_arr = [];

    let this_portA = [255, 255, 255, 255, 255, 255, 255, 255];
    let this_portF = [0, 0, 0, 0, 0, 0, 0, 0];

    let trs = [].slice.call(document.getElementsByClassName('dot-tr'));

    for(let i = 0; i < dot_row; i++) {
        let tds = [].slice.call(trs[i].getElementsByClassName('dot-td')).reverse();
        let flag = false;

        for(let j = 0; j < dot_col; j++) {
            let td = tds[j];

            if(td.textContent == '0') {
                this_portF[j] = this_portF[j];
            } else {
                if(flag == false && this_portA[j] == 255) {
                    this_portA[j] = 255 - Math.pow(2, j);
                }
                this_portF[j] = this_portF[j] + Math.pow(2, i);
            }
        }
    }

    for(let k = 0; k < dot_col; k++) {
        let portA_str = padding(this_portA[k].toString(2),8).split('').reverse().join('');
        this_portA[k] = parseInt(parseInt(portA_str, 2).toString(10));
        //let portF_str = padding(this_portF[k].toString(2),8).split('').reverse().join('');
        //this_portF[k] = parseInt(parseInt(portF_str, 2).toString(10));
    }
    dot_col_arr = this_portA;
    dot_row_arr = this_portF;


    if(cross_flag) {
        dot_col_arr = set_cross(dot_col_arr);
    }

    matrix_info_update(dot_col_arr, dot_row_arr);
}

function matrix_reset() {
    let dot_tr;
    let dot_td;

    let new_table = document.createElement('table');
    new_table.id = "dot-matrix-table-main";

    let parent =  document.getElementById("dot-matrix-table-main");

    while(parent.hasChildNodes()){
        parent.removeChild(parent.firstChild);
    }

    for(let i = 0; i < dot_row; i++) {
        dot_tr = document.createElement("tr");
        dot_tr.id = 'dot-tr' + (i + 1).toString();
        dot_tr.classList.add('dot-tr');

        for(let j = 0; j < dot_col; j++) {
            dot_td = document.createElement("td");
            dot_td.id = 'dot-td' + (j + 1).toString();
            dot_td.classList.add('dot-td');
            dot_td.textContent = 0;
            dot_td.addEventListener("click", function() {
                matrix_on(i, j);
            });

            dot_tr.append(dot_td);
        }
        document.getElementById("dot-matrix-table-main").append(dot_tr);
    }
    
    matrix_array_set();
}

//매트리스 정보를 업데이트하는 함수
function matrix_info_update(col, row) {
    console.log('update');
    let portA_arr = [];
    let portF_arr = [];

    let col_arr_length = col.length;
    let row_arr_length = row.length;

    //이진수로 변경하기
    for(let i = 0; i < col_arr_length; i++) {
        portA_arr.push("0b" + padding(col[i].toString(2), 8));
    }
    for(let i = 0; i < row_arr_length; i++) {
        portF_arr.push("0b" + padding(row[i].toString(2), 8));
    }

    document.getElementById('port-info-portA-content').textContent = "0b" + padding(portA.toString(2), 8);
    document.getElementById('port-info-portF-content').textContent = "0b" + padding(portF.toString(2), 8);
    document.getElementById('dot-matrix-array-info-column-content').textContent = portA_arr.join(', ');
    document.getElementById('dot-matrix-array-info-row-content').textContent = portF_arr.join(', ');
}

//클릭한 매트리스에 색상을 지정하는 함수
function matrix_color(col, row, on) {
    let this_td = document.getElementById("dot-tr"+(col+1)).getElementsByClassName("dot-td")[parseInt(row)];
    let this_color;

    if(on == 1) {
        this_color = '#F5A9BC';
    } else {
        this_color = '';
    }

    this_td.style.backgroundColor  = this_color;
}

//숫자->문자 변경한 후 문자열 채우기
function padding(n, len) {
    return n.length >= len ? n : new Array(len - n.length + 1).join('0') + n;
}


//꼬임 설정
function check_cross() {
    let pie = document.getElementById('dot-matrix-setting-cross').value;
    let piepie;
    if (pie == 1) {
        piepie = true;
    } else {
        piepie = false;
    }

    return piepie;
}

//크로스 체크 라디오 버튼 클릭하면 발생
function set_check_cross() {
    let pie = document.getElementById('dot-matrix-setting-cross').value;

    if (pie == 1) {
        document.getElementById('dot-matrix-setting-cross').value = 0;
    } else {
        document.getElementById('dot-matrix-setting-cross').value = 1;
    }

    matrix_array_set();
}

//꼬임 적용
function set_cross(arr) {
    let arr_length = arr.length;

    for(let i = 0; i < arr_length; i++) {
        let flag = 0;
        let temp_arr = padding(arr[i].toString(2),8).split('');
        let temp_arr_length = temp_arr.length;

        for(let j = 0; j < temp_arr_length; j++) {
            if(temp_arr[j] == '0' && flag == 0) {
                flag = 1;
                if(j % 2 == 1) {
                    temp_arr[j] = '1';
                    temp_arr[j - 1] = '0';
                } else {
                    temp_arr[j] = '1';
                    temp_arr[j + 1] = '0';
                }
            }
        }
        arr[i] = parseInt(parseInt(temp_arr.join(''), 2).toString(10));

    }
    return arr;
}