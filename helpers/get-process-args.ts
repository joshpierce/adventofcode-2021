const getArgs: () => { key: string; val: string }[] = () => {
    // iterates the process arguments and sends back ones starting with =
    return process.argv
        .filter((x) => x.startsWith('-'))
        .map((x) => {
            let parts: string[] = x.replace('-', '').split('=');
            return { key: parts[0], val: parts[1] };
        });
};

export { getArgs };
