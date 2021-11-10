export const catchAsync = function (fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}
  //catching errors in Async function