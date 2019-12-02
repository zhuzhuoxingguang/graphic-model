// 密码正则表达式 以数字或字符串开头的 可以包含下划线的6到16为字符组成
export const regPassword = /^[A-Za-z0-9][A-Za-z0-9_]{5,15}$/g

// 手机号正则表达式 国内手机号码
export const regMobile = /^((13[0-9])|(14[57])|(15([0-3]|[5-9]))|(17[0135678])|(18[0-9])|(19[89]))\d{8}$/

// 账户名正则
export const regAccount = /^[A-Za-z]\w+[^_]$/
