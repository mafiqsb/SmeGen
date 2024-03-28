const customThemeDatePicker = {
  popup: {
    root: {
      base: 'absolute top-14 bg-white z-50 block pt-2',
      inline: 'relative top-0 z-auto',
      inner: 'inline-block rounded-lg bg-white p-4 shadow-lg',
    },
    header: {
      title:
        'px-2 py-3 text-center font-semibold text-gray-900 dark:text-white',
      selectors: {
        base: 'flex justify-between mb-2',
        button: {
          base: 'text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch',
          prev: '',
          next: '',
          view: '',
        },
      },
    },
    view: {
      base: 'p-1',
    },
    footer: {
      base: 'flex mt-2 space-x-2',
      button: {
        base: 'w-full rounded-lg px-5 py-2 text-center text-sm font-medium ',
        today:
          'bg-amber-300 text-[#570987] hover:bg-[#570987] hover:text-amber-300 duration-300 ',
        clear:
          'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600',
      },
    },
  },
  views: {
    days: {
      header: {
        base: 'grid grid-cols-7 mb-1',
        title:
          'dow h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400',
      },
      items: {
        base: 'grid w-64 grid-cols-7',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 ',
          selected:
            'bg-amber-300 text-[#570987] hover:bg-[#570987] hover:text-amber-300 duration-300 ',
          disabled: 'text-gray-500',
        },
      },
    },
    months: {
      items: {
        base: 'grid w-64 grid-cols-4',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600',
          selected:
            'bg-amber-300 text-[#570987] hover:bg-[#570987] hover:text-amber-300 duration-300 ',
          disabled: 'text-gray-500',
        },
      },
    },
    years: {
      items: {
        base: 'grid w-64 grid-cols-4',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 text-gray-900',
          selected:
            'bg-amber-300 text-[#570987] hover:bg-[#570987] hover:text-amber-300 duration-300 ',
          disabled: 'text-gray-500',
        },
      },
    },
    decades: {
      items: {
        base: 'grid w-64 grid-cols-4',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9  hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 text-gray-900',
          selected:
            'bg-amber-300 text-[#570987] hover:bg-[#570987] hover:text-amber-300 duration-300 ',
          disabled: 'text-gray-500',
        },
      },
    },
  },
};

export default customThemeDatePicker;
