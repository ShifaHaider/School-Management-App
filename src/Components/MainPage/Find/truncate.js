function TruncatePipe(props) {
    var value = props.value || '';
    var limit = props.limit || 15;
    var trail = props.trail || '...';
    var position = props.position || 'right';
    if (position === 'left') {
        return value.length > limit
            ? trail + value.substring(value.length - limit, value.length)
            : value;
    } else if (position === 'right') {
        return value.length > limit
            ? value.substring(0, limit) + trail
            : value;
    } else if (position === 'middle') {
        return value.length > limit
            ? value.substring(0, limit / 2) + trail + value.substring(value.length - limit / 2, value.length)
            : value;
    } else {
        return value;
    }
}


export default TruncatePipe;
