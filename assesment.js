(function () {
    'use strict';
    const userNameInput = document.getElementById('username');
    const assesmentButton = document.getElementById('assesment');
    const resultDiv = document.getElementById('result-area');
    const tweetDiv = document.getElementById('tweet-area');

    /**
     * 指定した要素の子どもをすべて削除する
     * @param {HTMLElement} element HTMLの要素
     */
    function removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    assesmentButton.onclick = () => {
        const userName = userNameInput.value;
        if (userName.length === 0) {
            return;
        }

        removeAllChildren(resultDiv);
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDiv.appendChild(header);

        const paragraph = document.createElement('p');
        const result = assesment(userName);
        paragraph.innerText = result;
        resultDiv.appendChild(paragraph);

        removeAllChildren(tweetDiv);
        const anchor = document.createElement('a');
        const hrefVal = 'https://twitter.com/intent/tweet?button_hashtag='
            + encodeURIComponent('あなたのいいところ')
            + '&ref_src=twsrc%5Etfw';
        anchor.setAttribute('href', hrefVal);
        anchor.className = 'twitter-hashtag-button';
        anchor.setAttribute('data-text', result);
        anchor.setAttribute('data-show-count', false);
        anchor.innerText = 'Tweet #あなたのいいところ';
        tweetDiv.appendChild(anchor);

        twttr.widgets.load();
    };

    userNameInput.onkeydown = (event) => {
        if (event.key === 'Enter') {
            assesmentButton.onclick();
        }
    };

    const answers = [
        '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
        '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
        '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
        '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
        '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
        '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
        '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
        '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
        '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
        '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
        '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
        '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
        '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
        '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
        '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
        '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
        '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
    ];

    /**
     * 名前の文字列を渡すと診断結果を返す関数
     * @param {string} userName ユーザーの名前
     * @return {string} 診断結果
     */
    function assesment(userName) {
        let sumOfcharCode = 0;
        for (let i = 0; i < userName.length; i++) {
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }

        const index = sumOfcharCode % answers.length;
        let result = answers[index];

        result = result.replace(/\{userName\}/g, userName);

        return result;
    }

    console.log(assesment('太郎'));
    console.log(assesment('次郎'));
    console.log(assesment('太郎'));

    // Assertion Error の例
    console.assert(assesment('太郎') === '太郎のいいところは決断力です。次郎がする決断にいつも助けられる人がいます。', '診断結果の文言の特定の部分を名前に置換する処理が正しくありません。');

    // 正
    console.assert(assesment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。', '診断結果の文言の特定の部分を名前に置換する処理が正しくありません。');

    console.assert(assesment('太郎') === assesment('太郎'), '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。');
})();
