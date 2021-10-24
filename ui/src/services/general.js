/**
 * Converts yyyy-mm-dd to dd-mm-yyyy
 */
function formatDDMMYYYY(DATE) {
    //console.log("DATE", DATE)
    let res = "";
    try {
        res = DATE.split("-")
            .reverse()
            .join("-");
    } catch (err) {
        res = "";
    }
    return res;
}

export {
    formatDDMMYYYY
}