import { Button } from "@/components/ui/Button";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ContainerLayout from "./ContainerLayout";

export function Footer() {
  return (
    <footer className="bg-background  border-t border-foreground/10">
      <ContainerLayout>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6 group">
              <Image
                src="/arhant-logo-black-new.png"
                alt="Arhant Solutions Logo"
                width={160}
                height={50}
                className="h-12 w-auto object-contain transition-transform group-hover:scale-105 block dark:hidden"
                priority
              />

              {/* Dark mode logo */}
              <Image
                src="/arhant-logo-white.png"
                alt="Arhant Solutions Logo"
                width={160}
                height={50}
                className="h-12 w-auto object-contain transition-transform group-hover:scale-105 hidden dark:block"
                priority
              />
            </Link>
            <p className="text-foreground/60 font-sans text-sm leading-relaxed mb-6">
              The Best Insurance Software Provider in Nepal, delivering robust,
              flexible, and scalable digital solutions.
            </p>

          </div>

          <div>
            <h4 className="text-foreground font-heading font-bold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3 font-sans text-sm text-foreground/60">
              <li>
                <Link
                  href="#about-us"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#solutions"
                  className="hover:text-primary transition-colors"
                >
                  Our Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="#products"
                  className="hover:text-primary transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="#partners"
                  className="hover:text-primary transition-colors"
                >
                  Partners
                </Link>
              </li>
              <li>
                <Link
                  href="#blog"
                  className="hover:text-primary transition-colors"
                >
                  Blog & Articles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-heading font-bold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4 font-sans text-sm text-foreground/60">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Hattisar, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+977-1-4544868</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:info@arhant.com.np"
                  className="hover:text-primary transition-colors"
                >
                  info@arhant.com.np
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-heading font-bold mb-6">
              Newsletter
            </h4>
            <p className="text-foreground/60 font-sans text-sm mb-4">
              Subscribe to get the latest updates on insurance tech.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-foreground/5 border border-foreground/10 rounded-md px-3 py-2 text-sm text-foreground outline-none focus:border-primary transition-colors"
              />
              <Button size="icon" className="shrink-0 h-[38px] w-[38px]">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-foreground/10 text-center flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-foreground/40 text-sm font-sans">
            &copy; {new Date().getFullYear()} Arhant Solutions Pvt. Ltd. All
            rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/arhantsolutions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex hover:opacity-70 transition-opacity duration-300"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="w-8 h-8"
              >
                <path
                  d="M50 2.5c-58.892 1.725-64.898 84.363-7.46 95h14.92c57.451-10.647 51.419-93.281-7.46-95z"
                  fill="#1877F2"
                />
                <path
                  d="M57.46 64.104h11.125l2.117-13.814H57.46v-8.965c0-3.779 1.85-7.463 7.781-7.463h6.021V22.101c-12.894-2.323-28.385-1.616-28.722 17.66V50.29H30.417v13.814H42.54V97.5h14.92z"
                  fill="#fff"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/arhant-solutions-pvt-ltd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex hover:opacity-70 transition-opacity duration-300"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 152 152"
                className="w-8 h-8"
              >
                <circle cx={76} cy={76} r={76} fill="#0A66C2" />
                <g fill="#fff">
                  <path d="M59 48.37A10.38 10.38 0 1 1 48.63 38 10.38 10.38 0 0 1 59 48.37z" />
                  <rect
                    width="16.06"
                    height="50.93"
                    x="40.6"
                    y="63.07"
                    rx="2.57"
                  />
                  <path d="M113.75 89.47v22.17a2.36 2.36 0 0 1-2.36 2.36H99.67a2.36 2.36 0 0 1-2.36-2.36V90.16c0-3.21.93-14-8.38-14-7.22 0-8.69 7.42-9 10.75v24.78a2.36 2.36 0 0 1-2.34 2.31H66.25a2.35 2.35 0 0 1-2.36-2.36v-46.2a2.36 2.36 0 0 1 2.36-2.37h11.34A2.37 2.37 0 0 1 80 65.44v4c2.68-4 6.66-7.12 15.13-7.12 18.73-.01 18.62 17.52 18.62 27.15z" />
                </g>
              </svg>
            </a>
          </div>
          {/* <a
            href="http://www.arhant.com.np"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/40 hover:text-foreground transition-colors text-sm font-sans"
          >
            www.arhant.com.np
          </a> */}
        </div>
      </ContainerLayout>
    </footer>
  );
}
