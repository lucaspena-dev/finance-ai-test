type PercentageItemProps = {
  icon: React.ReactNode
  title: string
  value: number
}

function PercentageItem({ icon, title, value }: PercentageItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <span className="text-sm font-bold">{value}%</span>
    </div>
  )
}

export default PercentageItem
