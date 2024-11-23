export default function ProductOptions({ options }: { options: Array<string> }) {
  return (
    <select className="my-5 outline-none text-sm border py-2.5 px-3 rounded">
      <option value="">옵션 선택</option>
      {options?.map((item, key) => (
        <option key={key}>{item}</option>
      ))}
    </select>
  );
}
