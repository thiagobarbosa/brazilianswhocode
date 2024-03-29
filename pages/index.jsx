import { useState, useRef, useEffect } from "react";
import { sortBy, shuffle } from "lodash-es";
import cx from "classnames";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import ClickableBox from "clickable-box";
import styles from "../components/home/index.module.scss";
import getTwitterProfiles from "../utilities/get-twitter-profiles";
import Profile from "../components/profile";
import Nav from "../components/nav";
import Loader from "../components/loader";
import FilterItem from "../components/filter-item";
import categoriesJson from "../categories.json";
import countries from "../countries.json"
import paginate from "../utilities/paginate";
import CloseIcon from "../icons/close";
import FilterIcon from "../icons/filter";
import Button from "../components/button";
import "@reach/dialog/styles.css";

const TWITTER_ACCOUNT_ID = "1576146354669330433";

export async function getStaticProps() {
  const profiles = await getTwitterProfiles(TWITTER_ACCOUNT_ID);

  //building categories to be used in filters
  const categories = categoriesJson.map((category) => ({
    ...category,
    count: profiles.filter((profile) => {
      return profile.tags[category.type][category.id];
    }).length,
  }));

  //adding non-Brazilian places to categories
  countries.map((country) => (
    categories.push({id: country.id, type: "externalLocation", title: country.title, 
    count: profiles.filter((profile) => {
      return profile.tags["externalLocation"][country.id];
    }).length,
  })
  ));

  return {
    revalidate: 3600,
    props: {
      profiles,
      categories,
    },
  };
}

export default function Home({ profiles, categories }) {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleDevelopers, setVisibleDevelopers] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});

  const [isFilterListVisible, setIsFilterListVisible] = useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const [currentPage, setCurrentPage] = useState(1);

  const profileContainerRef = useRef();

  const filterCategoryTypes = [
    { name: "Expertise", id: "expertise"},
    { name: "Location (Brazil)", id: "brazilianLocation"},
    { name: "Location (Outside Brazil)", id: "externalLocation"},
    { name: "Position", id: "position" }
  ];

  function filterItemOnChange(e, section) {
    const categoryId = e.target.value;
    const isChecked = e.target.checked;

    const newSelectedFilters = selectedFilters[section.id] || [];

    if (isChecked) {
      newSelectedFilters.push(categoryId);
    } else {
      const i = newSelectedFilters.indexOf(categoryId);

      newSelectedFilters.splice(i, 1);
    }

    setSelectedFilters({
      ...selectedFilters,
      [section.id]: newSelectedFilters,
    });
    setCurrentPage(1);
  }

  useEffect(() => {
    // displays the developers in a random order
    const shuffledDevelopers = shuffle(profiles);
    setVisibleDevelopers(shuffledDevelopers);
    setIsLoading(false);
  }, [profiles]);

  const numDevelopersPerPage = 50;
  const numPagesToShowInPagination = 5;

  const isNoFilterApplied = Object.entries(selectedFilters).every(
    (category) => {
      const [, value] = category;
      return value.length === 0;
    }
  );

  const filteredDevelopers = isNoFilterApplied
    ? visibleDevelopers
    : visibleDevelopers.filter((developer) => {
        // A profile should appear if they have at least one tag within each
        // section.
        return Object.entries(selectedFilters).every((category) => {
          const [categoryName, categoryValue] = category;

          if (categoryValue.length === 0) {
            return true;
          }

          return categoryValue.some((filter) => {
            return developer.tags[categoryName][filter];
          });
        });
      });

  const pagination = paginate(
    filteredDevelopers.length,
    currentPage,
    numDevelopersPerPage,
    numPagesToShowInPagination
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Nav
            filter
            theme="dark"
            toggleFilterList={() => {
              setIsFilterListVisible(!isFilterListVisible);
            }}
            isLoading={isLoading}
          />

          <div
            className={cx({
              [styles.filterContainer]: true,
              [styles.filterListVisible]: isFilterListVisible,
            })}
          >
            {filterCategoryTypes.map((section) => {
              const categoriesInSection = categories.filter(
                (c) => c.type === section.id
              );
              const sortedCategoriesInSection = sortBy(
                categoriesInSection,
                (category) => category.title
              );
              return (
                <div key={section.id}>
                  <h3 className={styles.filterCategoryTitle}>{section.name}</h3>
                  {sortedCategoriesInSection.map((category) => (
                    <FilterItem
                      key={category.id}
                      id={category.id}
                      type="row"
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        filterItemOnChange(e, section);
                        gtag("event", isChecked ? "check" : "uncheck", {
                          event_category: "filter",
                          event_label: category.title,
                          value: 1,
                        });
                      }}
                      isChecked={
                        selectedFilters[section.id]?.includes(category.id) ||
                        false
                      }
                      className={styles.filterItemInput}
                      title={category.title}
                      count={category.count}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={cx({
            [styles.main]: true,
            [styles.slide]: isFilterListVisible,
          })}
          ref={profileContainerRef}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className={styles.profiles}>
                {filteredDevelopers.map((profile, i) => {
                  if (i < pagination.startIndex || i > pagination.endIndex) {
                    return null;
                  }

                  return (
                    <Profile
                      profile={profile}
                      key={profile.id}
                      lazyRoot={profileContainerRef}
                    />
                  );
                })}
              </div>

              {filteredDevelopers.length > 0 ? (
                <>
                  <div className={styles.paginationContainer}>
                    <button
                      onClick={() => {
                        setCurrentPage(currentPage - 1);
                        profileContainerRef.current.scrollTo(0, 0);
                      }}
                      disabled={pagination.currentPage === pagination.startPage}
                      type="button"
                      className={styles.paginationArrow}
                    >
                      ←
                    </button>
                    <button
                      className={styles.pageNumberButton}
                      onClick={() => {
                        setCurrentPage(1);
                        profileContainerRef.current.scrollTo(0, 0);
                      }}
                      type="button"
                      disabled={pagination.currentPage === 1}
                    >
                      1
                    </button>
                    {currentPage >= numPagesToShowInPagination && <>&hellip;</>}
                    {pagination.pages.map((pageNumber) => {
                      // Skip over these page numbers because they'll always appear
                      // in the pagination.
                      if (
                        pageNumber === 1 ||
                        pageNumber === pagination.totalPages
                      ) {
                        return null;
                      }

                      return (
                        <button
                          key={pageNumber}
                          className={styles.pageNumberButton}
                          onClick={() => {
                            setCurrentPage(pageNumber);
                            profileContainerRef.current.scrollTo(0, 0);
                          }}
                          disabled={pagination.currentPage === pageNumber}
                          type="button"
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    {currentPage <=
                      pagination.totalPages -
                        (numPagesToShowInPagination + 1) && <>&hellip;</>}
                    {pagination.totalPages !== 1 && (
                      <button
                        className={styles.pageNumberButton}
                        onClick={() => {
                          setCurrentPage(pagination.totalPages);
                          profileContainerRef.current.scrollTo(0, 0);
                        }}
                        type="button"
                        disabled={
                          pagination.currentPage === pagination.totalPages
                        }
                      >
                        {pagination.totalPages}
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setCurrentPage(currentPage + 1);
                        profileContainerRef.current.scrollTo(0, 0);
                      }}
                      disabled={pagination.currentPage === pagination.endPage}
                      type="button"
                      className={styles.paginationArrow}
                    >
                      →
                    </button>
                  </div>
                  <div className={styles.filterButtonContainer}>
                    <Button type="button" onClick={open} fullWidth={false}>
                      <FilterIcon /> Filter
                      {selectedFilters.length > 0 && (
                        <>
                          <span>·</span> <span>{selectedFilters.length}</span>
                        </>
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                <div>There are no developers that match these filters.</div>
              )}
            </>
          )}
          <div>
            <DialogOverlay isOpen={showDialog} onDismiss={close}>
              <DialogContent aria-label="Filter developers">
                <div className={styles.dialogHeader}>
                  <ClickableBox className={styles.closeButton} onClick={close}>
                    <span aria-hidden>
                      <CloseIcon />
                    </span>
                  </ClickableBox>
                  <h2>Filter</h2>
                  <button
                    onClick={() => {
                      setSelectedFilters([]);
                      setCurrentPage(1);
                    }}
                    className={styles.filterClear}
                    type="button"
                    style={{ marginRight: "16px" }}
                  >
                    Clear
                  </button>
                </div>
                <div className={styles.dialogBody}>
                  {filterCategoryTypes.map((section) => {
                    const categoriesInSection = categories.filter(
                      (c) => c.type === section.id
                    );
                    const sortedCategoriesInSection = sortBy(
                      categoriesInSection,
                      (category) => category.title
                    );

                    return (
                      <div key={section.id}>
                        <h3 className={styles.filterCategoryTitle}>
                          {section.name}
                        </h3>
                        {sortedCategoriesInSection.map((category) => (
                          <FilterItem
                            key={category.id}
                            id={category.id}
                            type="pill"
                            onChange={(e) => {
                              filterItemOnChange(e, section);
                            }}
                            isChecked={
                              selectedFilters[section.id]?.includes(
                                category.id
                              ) || false
                            }
                            className={styles.filterItemInput}
                            title={category.title}
                            count ={category.count}
                          />
                        ))}
                      </div>
                    );
                  })}
                </div>
                <div className={styles.dialogFooter}>
                  <Button type="button" onClick={close}>
                    View {filteredDevelopers.length} developer
                    {filteredDevelopers.length !== 1 ? "s" : ""}
                  </Button>
                </div>
              </DialogContent>
            </DialogOverlay>
          </div>
        </div>
      </div>
    </>
  );
}
