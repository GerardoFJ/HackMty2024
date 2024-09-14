const navigateToPage = (page: string, amount?: number) => {
    if (amount) {
        window.location.href = '/'+page+'?amount='+amount;
    } else {
        window.location.href = '/'+page;
    }
}
export { navigateToPage };