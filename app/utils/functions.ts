const navigateToPage = (page: string, amount?: number, user?: string) => {
    if (amount) {
        window.location.href = '/'+page+'?amount='+amount;
    } else if (user) {
        window.location.href = '/'+page+'?user='+user;
    } else {
        window.location.href = '/'+page;
    }
}

const getUser = () => {
    const searchParams = new URLSearchParams(window.location.search);
    if (!searchParams.has('user')) {
        return 'user';
    }
    return searchParams.get('user');
}

export { navigateToPage, getUser };