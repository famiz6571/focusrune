import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Calendar } from "lucide-react";

interface DateOption {
  label: string;
  value: string;
}

interface DateSelectProps {
  selected: string;
  onChange: (value: string) => void;
  options?: DateOption[];
  placeholder?: string;
}

export default function DateSelect({
  selected,
  onChange,
  options,
  placeholder = "Select date",
}: DateSelectProps) {
  // Default options: today, tomorrow, next week
  const defaultOptions: DateOption[] = options || [
    { label: "Today", value: new Date().toISOString().split("T")[0] },
    {
      label: "Tomorrow",
      value: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    },
    {
      label: "Next Week",
      value: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
    },
  ];

  const selectedOption = defaultOptions.find((o) => o.value === selected);

  return (
    <Listbox value={selectedOption?.value || ""} onChange={onChange}>
      <div className="relative w-full md:w-40">
        <Listbox.Button className="relative w-full cursor-pointer rounded border dark:border-gray-700 dark:bg-gray-700 bg-white dark:text-gray-100 text-gray-900 py-2 pl-3 pr-10 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2">
          <Calendar size={16} />
          <span className="block truncate">
            {selectedOption?.label || placeholder}
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-150"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            {defaultOptions.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ active }) =>
                  `cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                    active
                      ? "bg-blue-500 text-white"
                      : "text-gray-900 dark:text-gray-100"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-semibold" : "font-normal"
                      }`}
                    >
                      {option.label}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
