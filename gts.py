import pandas as pd
from RubiksCube2 import Cube2

rc = Cube2()

# Generate 11 move scrambles with an 8 move optimal solution

def main():
    dfdict = {"scrambles":[]}
    for i in range(8):
        dfdict[f"move{i}"] = []
    max_scr = 1_000
    scr_count = 0
    while scr_count < max_scr:
        s = rc.scramble(11)
        soln, length = rc.optimalSolution(s, info=True, ftrack=True)
        if length == 8:
            dfdict["scrambles"].append(s)
            qsoln = rc.qtm(soln)
            for i, q in enumerate(qsoln):
                dfdict[f"move{i}"].append(q)
            scr_count += 1
            if scr_count > 0 and scr_count % 50 == 0:
                print(f"Found {scr_count} valid scrambles.")
    df = pd.DataFrame(dfdict)
    df.to_csv("cuble.csv", index=False)

if __name__ == "__main__":
    main()
