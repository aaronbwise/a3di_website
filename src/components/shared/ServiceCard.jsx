import ClipboardIcon from '../../icons/ClipboardIcon'
import LaptopCodeIcon from '../../icons/LaptopCodeIcon'
import ChartLineIcon from '../../icons/ChartLineIcon'
import UsersIcon from '../../icons/UsersIcon'

const iconMap = {
  clipboard: ClipboardIcon,
  laptopCode: LaptopCodeIcon,
  chartLine: ChartLineIcon,
  users: UsersIcon,
}

export default function ServiceCard({ iconName, title, description }) {
  const Icon = iconMap[iconName]

  return (
    <div className="bg-white rounded-lg shadow-[0_3px_10px_rgba(0,0,0,0.2)] p-5 m-1 text-center max-w-[700px] mx-auto w-full h-auto md:h-[250px] transition-transform duration-200 hover:-translate-y-4 my-4">
      {Icon && <Icon className="text-primary" />}
      <h3 className="text-[20px] font-bold mb-0.5">{title}</h3>
      <p className="text-base text-center">{description}</p>
    </div>
  )
}
