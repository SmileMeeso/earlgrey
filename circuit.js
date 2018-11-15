// 회로 설정 관련
// ie support X

var default_circuit_load() = function () {
    var _cpu;
    var _portA;
    var _portB;
    var _portC;
    var _portD;
    var _portE;
    var _portF;
    var _portG;

    //DDRX 레지스터 설정
    /*
    option_ = {
        DDRA: 0b00000000,
        DDRC: 0b00001111,
        ...
    }
    option_ 객체에 있는 키에 해당되는 ddr만 수정
    */
    var set_DDR = function(option_) {

    }

    //PINX 레지스터 설정
    /*
    option_ = {
        PINA: 0b00000000,
        PINC: 0b00001111,
        ...
    }
    option_ 객체에 있는 키에 해당되는 ddr만 수정
    */
    var set_PIN = function(option_) {//pinx_ ([] | "") :

    }

    //PORTX 레지스터 설정
    /*
    option_ = {
        PORTA: 0b00000000,
        PORTC: 0b00001111,
        ...
    }
    option_ 객체에 있는 키에 해당되는 ddr만 수정
    */
    var set_PORT = function(option_) {//portx_ ([] | "") :

    }

    //DDRX 레지스터 설정 가져오기
    /*
    ddrx_ = null, "", []
    if ddrx = null : 전체 설정 가져오기
    return : 각자 타입으로, 전체는 객체 (이상해...) <- 써보고 변경(todo)
    (todo)일단은 불러온거 바로 대입하거나 쓸 수 있게 만들고 싶음.. 근데 전체인 경우에는 어떤 순서로 리턴할지 호출부에서 알 수 없으니까...
    */
    var get_setting_DDR = function(ddrx_ = null) {

    }
    //PINX 레지스터 설정 가져오기
    /*
    pinx_ = null, "", []
    if pinx = null : 전체 설정 가져오기
    return : 각자 타입으로, 전체는 객체
    */
    var get_setting_PIN = function(pinx_ = null) {

    }
    //PORTX 레지스터 설정 가져오기
    /*
    portx_ = null, "", []
    if portx = null : 전체 설정 가져오기
    return : 각자 타입으로, 전체는 객체
    */
    var get_setting_PORT = function(portx = null) {

    }
}

//기본 회로
function default_circuit () {

}

//부품 추가
function add_component() {
    var _component = {
        dot_matrix: {
            array_col: 0, //col 갯수
            array_row: 0, //row 갯수
            connection_info: {
                // portA: [],
                // portF: []
            } //연결이 어디에 어떤식으로 되어있는지
        }
    };

    // 없는 컴포넌트면 오류
    var set_component = function (component_name_, option_) {
        _component[component_name_] = option_; //todo: 옵션 객체에 있는 key 값만 수정
    }

    // 이미 연결된 회로에 연결할 경우 오류
    var add_componenet = function (component_name_, option) {

    }

    // 컴포넌트 정보 가져오기
    var get_component = {
        component_name: function () {

        },
        component_setting: function (component_name_, setting_name) {

        }
    }
}

//연결 추가
function add_connect() {

}

//전압 추가
function add_volt() {

}
