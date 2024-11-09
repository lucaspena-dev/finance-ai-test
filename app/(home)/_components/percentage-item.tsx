type PercentageItemProps = {
  icon: React.ReactNode
  title: string
  value: number
}

function PercentageItem({ icon, title, value }: PercentageItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-white bg-opacity-[3%] p-2">{icon}</div>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <span className="text-sm font-bold">{!value ? 0 : value}%</span>
    </div>
  )
}

export default PercentageItem
