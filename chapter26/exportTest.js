// 每个模块只能有一个默认导出
export default function test(name) {
  return 'hello ' + name;
}

export const name = 'wst';

const msg = 'hello world';
export { msg as message }; // 导出时提供别名
