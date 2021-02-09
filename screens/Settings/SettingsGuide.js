import React from "react";
import { ScrollView, Text } from "react-native";
import styled from "styled-components";

const View = styled.View`
    flex : 1;
    background-color : ${props => props.theme.bgColor};
    padding-left : 25;
    padding-right : 10;
`

const Category = styled.View`
    padding-top : 20;
    padding-right : 15;
`

const CategoryTitle = styled.Text`
    font-size : 24;
    margin-bottom : 13;
`

const Question = styled.Text`
    font-size : 15.5;
    margin-bottom : 5;
    font-weight : bold;
`

const Answer = styled.Text`
    font-size : 15.5;
    margin-bottom : 23;
`

export default () => (
    <View>
        <ScrollView>
            <Category>
                <CategoryTitle>1. 매칭</CategoryTitle>
                <Question>Q. 매칭 후보로 올라오는 사람의 기준은?</Question>
                <Answer>A. 본인의 이상형 기준에 부합하는 모든 사람들이 보여진다. 참고로 본인이 상대방의 이상형에 부합하는지 여부는 무관하다.</Answer>
                <Question>Q. 매칭을 위해서 꼭 셀카를 등록해야 하는가?</Question>
                <Answer>A. 해당 어플을 이용하기 위해서는 무조건 프로필 이미지로 본인의 얼굴이 잘 보여지는 이미지를 등록해야 한다. 만약 본인의 셀카가 아닌 이미지를 등록시 제제의 사유가 된다.</Answer>
                <Question>Q. 만약 내 프로필을 확인한 누군가가 내 신상을 알아내면 어떡하는가?</Question>
                <Answer>A. 이를 방지하기 위해 해당 어플에서는 프로필 사진을 제외한 타 유저의 정보를 일체 노출시키지 않는다. 또한 타인의 프로필 이미지를 부적절한 용도로 사용하는 것을 방지하기 위해 해당 어플은 모든 화면에서 스크린샷을 허용하지 않는다.</Answer>
                <Question>Q. 마음에 드는 사람과는 어떻게 매칭이 되고 연락을 할 수 있는가?</Question>
                <Answer>A. 두 유저가 서로에 대해 좋아요를 눌렀을 시 두 유저가 매칭이 매칭이 되면서 채팅방이 활성화된다. 서로 매칭이 되지 않는 경우에는 상대방에게 연락할 수 있는 방법이 존재하지 않는다.</Answer>
                <Question>Q. 혹시 좋아요가 아닌 스킵버튼을 눌렀을 때 해당 유저가 나중에 다시 보여질 수 있는가?</Question>
                <Answer>A. 한 번 좋아요나 스킵버튼을 누른 유저는 다시 보여지지 않는다.</Answer>
                <Question>Q. 만약 상대방의 프로필사진이 도용인 경우 어떻게 하는가?</Question>
                <Answer>A. 메인 화면의 신고버튼을 이용하면 해당 유저의 신고가 가능하다.</Answer>
                <Question>Q. 더 이상 매칭 후보가 없는 경우 어떻게 하는가?</Question>
                <Answer>A. 매칭 후보가 없는 것은 현재 본인의 이상형에 부합하는 유저가 더 없기 때문이다. 이상형 기준을 완화하거나 그에 부합하는 새로운 유저가 등록될 때까지 기다려야 한다.</Answer>
            </Category>
            <Category>
                <CategoryTitle>2. 채팅</CategoryTitle>
                <Question>Q. 채팅에서 텍스트를 제외한 이미지 등을 전송할 수는 없는가?</Question>
                <Answer>A. 안타깝게도 데이터베이스 용량으로 인해 본 어플의 채팅에서는 텍스트밖에 전송할 수 없다. 만약 이모티콘, 이미지 등 다양한 미디어를 사용하여 상대와 대화를 하고싶은 경우 카카오톡 아이디를 주고받는 등의 대안을 추천한다.</Answer>
                <Question>Q. 채팅 전송을 누르고 나서 약간의 딜레이가 있다</Question>
                <Answer>A. 역시나 같은 이유이다. 해당 어플은 무료 서버와 무료 데이터베이스를 사용하고 있기 때문에 시중의 채팅 어플에 비해서 그 성능이 부족할 수 밖에 없다. 이 점에 대해서는 양해를 구한다.</Answer>
                <Question>Q. 채팅방에서 상대방이 메시지를 읽었는지 여부는 확인할 수 없는가?</Question>
                <Answer>A. 실시간으로 읽음을 확인하는 기능은 데이터베이스 상의 문제로 구현하지 못했다. 다만 본인이 마지막으로 메시지를 전송한 경우 채팅방을 처음 들어간 순간 해당 메시지가 확인되었는지 아닌지를 확인하는 기능까지는 구현이 가능하다. 만약 요청이 많다면 해당 기능은 바로 추가하겠다.</Answer>
                <Question>Q. 채팅창 목록에서 각 채팅의 오른쪽에 위치한 보라색 마크는 무엇을 의미하는가?</Question>
                <Answer>A. 아직 확인하지 않은 메시지가 있는 채팅방을 의미한다.</Answer>
                <Question>Q. 상대방과 대화를 종료하고 싶은 경우 어떻게 하는가?</Question>
                <Answer>A. 채팅방목록에서 해당 채팅방을 길게 누르거나 채팅방 내부의 우측 상단에 위치한 버튼을 누를 시 대화 종료의 기능을 확인할 수 있다. 대화를 종료할 경우 상대방으로부터 더 이상 대화가 수신되지 않는다.</Answer>
                <Question>Q. 한 번 매칭되었던 상대와 대화를 종료했는데 다시 매칭될 방법은 없는가?</Question>
                <Answer>A. 한 번 매칭된 상대와 재매칭의 방법은 존재하지 않는다. 따라서 대화를 종료한 경우 본 어플을 통해서 해당 유저와 다시 접촉할 방법은 없다.</Answer>
                <Question>Q. 대화 상대방을 신고할 수는 없는가?</Question>
                <Answer>A. 채팅방 나가기와 마찬가지로 해당 채팅방의 우측 상단에 위치한 버튼을 클릭하면 신고를 진행할 수 있다. 신고를 하는 경우 역시 해당 유저로부터 더 이상 메시지가 수신되지 않는다.</Answer>
            </Category>
            <Category>
                <CategoryTitle>3. 계정 설정 및 보안</CategoryTitle>
                <Question>Q. 계정사용을 위해 꼭 웹메일을 사용해야 하는가?</Question>
                <Answer>A. 본교 학생임을 인정하기 위해서는 웹메일 인증이 필수적이다. 웹메일은 본교 학생인증 용도 외에는 사용되지 않으니 크게 신경쓰지 않아도 된다.</Answer>
                <Question>Q. 개인정보가 유출되면 어떡하는가?</Question>
                <Answer>A. 기본적으로 해당 어플에 중요한 개인정보는 존재하지 않기 때문에 걱정하지 않아도 된다. 그러나 비밀번호의 경우 유출될 경우를 대비하여 평소에 사용하지 않는 비밀번호를 사용하기를 권장한다.</Answer>
                <Question>Q. 계정 이름은 꼭 본명으로 등록해야 하는가?</Question>
                <Answer>A. 그렇다. 가명, 혹은 닉네임 등을 사용할 경우 역시 제제가 될 수 있으며 이는 가능한 개인정보 도용을 방지하기 위해서이다.</Answer>
                <Question>Q. 계정을 비활성화할 수는 없는가?</Question>
                <Answer>A. 계정 비활성화는 설정탭-계정 으로 들어가 맨 하단에 위치한 활성화-비활성화 버튼을 이용하면 된다. 계정을 비활성화하는 경우 타 유저들에게 해당 계정이 노출되지 않으며 이미 채팅방이 활성화되어있던 상대 역시 해당 유저에게 메시지를 보낼 수 없다. 비활성화한 계정을 다시 활성화하는데 필요한 최소 기간 등은 존재하지 않는다.</Answer>
                <Question>Q. 계정설정에서 본인의 학과가 존재하지 않는다.</Question>
                <Answer>A. 본 어플은 서울캠퍼스 학생들만을 대상으로 하고 있다. 이는 반복되는 이유이지만 지나치게 많은 이용자들을 해당 어플이 소화할 수 없기 때문이며 서비스가 안정화되는 경우 글로벌캠퍼스에 대한 서비스 역시 확대할 의향이 있다.</Answer>
                <Question>Q. 이상형을 설정할 때 해당 내용이 무관하면 어떻게 하는가?</Question>
                <Answer>A. 만약 해당 내용의 옵션 중에 '무관'이 존재하는 경우 해당 옵션을 선택하고 그렇지 않은 경우 모든 옵션을 선택하면 된다.</Answer>
            </Category>
            <Category>
                <CategoryTitle>4. 기타</CategoryTitle>
                <Question>Q. 신고한 유저는 어떻게 되는가?</Question>
                <Answer>A. 신고된 유저는 관리자가 신고 사유를 확인한 후 필요에 따라 계정의 이용을 무기한 정지한다. 다만 무분별한 신고 기능 남용 역시 제제 사유가 될 수 있으므로 주의 바란다.</Answer>
                <Question>Q. 어플의 업데이트는 언제 이루어지는가?</Question>
                <Answer>A. 제작자가 졸업을 앞두고 있어 정기적인 업데이트는 이루어지기 힘들다. 다만 심각한 버그가 발견되는 경우 가능한 빨리 수정을 진행할 예정이다.</Answer>
            </Category>
        </ScrollView>
    </View>
)