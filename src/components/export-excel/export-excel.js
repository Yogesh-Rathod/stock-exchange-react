import React from 'react';
import ReactExport from 'react-export-excel';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportExcel = ({ data, labelValue }) => {
    return (
        <div className="top-buffer">
            {data && data.length ? (
                <ExcelFile
                    element={
                        <button className="btn btn-primary">
                            Export to Excel
                        </button>
                    }
                >
                    <ExcelSheet data={data} name="Financial">
                        {labelValue && labelValue.length
                            ? labelValue.map((data, index) => {
                                  return (
                                      <ExcelColumn
                                          key={index}
                                          label={data.label}
                                          value={data.value}
                                      />
                                  );
                              })
                            : null}
                    </ExcelSheet>
                </ExcelFile>
            ) : null}
        </div>
    );
};

export default ExportExcel;
