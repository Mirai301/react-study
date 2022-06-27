export const ColoredMessage = (props) => {
    // Propsを分割代入(propsの記述を省略)
    const { color, children } = props;

    const contentStyle = {
        // プロパティ名と設定値が同一になったので省略記法が使用可能ｓ
        // color: color,
        color,
        fontSize: "20px"
    };

    return <p style={contentStyle}>{children}</p>
}