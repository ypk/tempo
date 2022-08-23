const QS = (url, limit, offset) => {
    const newUrl = new URL(url); 
    if(limit) {
        newUrl.searchParams.set("limit", Number.parseInt(limit));
    }
    if(offset) {
        newUrl.searchParams.set("offset", Number.parseInt(offset));
    }
    return newUrl.toString();
}

export default QS;