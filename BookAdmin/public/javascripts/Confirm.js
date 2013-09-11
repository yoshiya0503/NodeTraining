function deleteModal() {
    var ret = confirm('削除しますがよろしいですか？');
    if (ret === true){
        console.log('true');
        document.getElementById('del').submit();
    } else {
        console.log('false');
        location.href = '/index.html'; 
    }
};
/*
submitFormElem = document.getElementById('del');

submitFormElem.onsubmit = function() {
    if (isSubmitAllowed()) {
        return true;
    } else {
        return false;
    }
};
*/
