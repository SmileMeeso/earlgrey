window.addEventListener('wheel', main_page_scrolling);
window.addEventListener('load', scrollInit);

function main_page_scrolling(e) {

    //방향 선택
    var delta = null;
    var direction = false;

    if(e.wheelDelta) {
        delta = e.wheelDelta / 60; // up : 2, down : -2
    }else if(e.detail) { //firefox
        delta = -e.detail/2;
    }

    if(delta != null) {
        direction = delta > 0 ? -1 : 1; //-1 : up, 1 : down
    }

    //메인에 표시되는 콘텐츠들
    var main_contents = document.getElementsByClassName('main_content');
    var main_contents_length = main_contents.length;

    //섹션 구분 코드(section + 1, 2, 3, 4, ...)
    var content_init_code = 'section';
    var content_init_code_length = content_init_code.length;

    //현재 보고있는 콘텐츠
    var now_show_content = document.getElementsByClassName("now_show")[0]; //현재 보고있는 콘텐츠 div
    var now_show_content_id = now_show_content.id; //현재 보고있는 콘텐츠의 ID
    var now_show_content_num = Number(now_show_content_id.slice(content_init_code_length)); //현재 보고있는 콘텐츠의 번호

    //다음에 올 콘텐츠 초기화
    var next_show_content = undefined;
    var content_init_name = '';

    //다음 컨텐츠 선택
    if((now_show_content_num + direction > 0) && (now_show_content_num + direction < main_contents_length + 1)) {
        content_init_name = content_init_code + (now_show_content_num + direction); //다음 컨텐츠 ID(up : -1, down : +1)
        next_show_content = document.getElementById(content_init_name); //다음에 볼 콘텐츠 div
    }

    if(next_show_content) {
        next_show_content.scrollIntoView({block: "start", behavior: "smooth"});
        next_show_content.setAttribute('class', 'main_content now_show');

        now_show_content.removeAttribute('class');
        now_show_content.setAttribute('class', 'main_content');
    }
}

function scrollInit(e){
    console.log('on load');

    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
}

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}
