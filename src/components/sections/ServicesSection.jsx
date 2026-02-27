import SectionHeading from '../shared/SectionHeading'
import ServiceCard from '../shared/ServiceCard'
import { services } from '../../content/services'

export default function ServicesSection() {
  return (
    <section id="services" className="py-7">
      <div className="mx-auto max-w-[1100px] px-10 max-md:px-4">
        <SectionHeading
          title="Services"
          subtitle="A3DI can help your organisation no matter where you are along the evidence pathway..."
        />
        <div className="grid grid-cols-1 justify-center items-center">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              iconName={service.iconName}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
